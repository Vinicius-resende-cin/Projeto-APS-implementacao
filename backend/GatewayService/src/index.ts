// Importa as dependências necessárias
import express from "express";
import logger from "morgan";
import expressHttpProxy from "express-http-proxy";
import CircuitBreaker from "opossum";
import cors from "cors";

// Cria a instância do aplicativo express
const app = express();

// Middleware para logar as requisições HTTP
app.use(logger("dev"));
app.use(cors());

// Opções de configuração do Circuit Breaker
const breakerOptions = {
  timeout: 5000, // Tempo de espera antes de considerar uma falha (ms)
  errorThresholdPercentage: 50, // Porcentagem de falhas para abrir o circuito
  resetTimeout: 30000 // Tempo para tentar fechar o circuito (ms)
};

const getServiceAddr = async (serviceName: string) => {
  return await fetch(`http://discovery:3001/?name=${serviceName}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
};

// Mapeamento dinâmico de serviços para portas
const servicePorts = {};

// Função para criar um Circuit Breaker para um serviço específico
const createCircuitBreaker = (serviceName: string) => {
  const servicePort = servicePorts[serviceName];
  console.log(`Creating Circuit Breaker for ${serviceName} at ${servicePort}`);
  const proxy = expressHttpProxy(`${serviceName}:${servicePort}`);

  // Assinatura de função que corresponde ao que o Circuit Breaker espera.
  const proxyFunction = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        // Chama o serviço através do proxy
        proxy(req, res, next);
        if (res.statusCode >= 500) {
          reject(res.statusMessage);
        } else {
          resolve();
        }
      } catch (err) {
        // Chame next com o erro, se houver.
        next(err);
        reject(err);
      }
    });
  };

  // new CircuitBreaker espera uma função que retorna uma Promise.
  return new CircuitBreaker(proxyFunction, breakerOptions);
};

// Mapa dinâmico para armazenar os Circuit Breakers para cada serviço.
const circuitBreakers = {};

// Middleware que intercepta todas as requisições
app.use("/", async (req, res, next) => {
  // Extrai o nome do serviço a partir do caminho da requisição
  const serviceName = req.path.split("/")[1];
  console.log(`Request to ${serviceName}`);
  // Verifica se o Circuit Breaker para o serviço já foi criado
  if (!circuitBreakers[serviceName]) {
    console.log("Service not found. Consulting discovery service...");
    servicePorts[serviceName] = (await getServiceAddr(serviceName))["servicePort"];
    // Verifica se o discovery service encontrou o serviço
    if (!servicePorts[serviceName]) {
      return res.status(502).send("Service not found.");
    }
    circuitBreakers[serviceName] = createCircuitBreaker(serviceName);
  }
  // Recupera o Circuit Breaker correspondente ao serviço
  const circuitBreaker = circuitBreakers[serviceName];
  if (circuitBreaker) {
    // Executa a requisição através do Circuit Breaker
    circuitBreaker.fire(req, res).catch(next);
  } else {
    // Se o serviço não for encontrado, retorna erro 502
    res.status(502).send("Service not found.");
  }
});

// Inicia o servidor na porta especificada
app.listen(3100, () => {
  console.log("API Gateway running!");
});
