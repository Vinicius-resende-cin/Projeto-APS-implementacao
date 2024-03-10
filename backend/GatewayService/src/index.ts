// Importa as dependências necessárias
import express from 'express';
import logger from 'morgan';
import expressHttpProxy from 'express-http-proxy';
import CircuitBreaker from 'opossum';

// Cria a instância do aplicativo express
const app = express();

// Middleware para logar as requisições HTTP
app.use(logger('dev'));

// Opções de configuração do Circuit Breaker
const breakerOptions = {
  timeout: 5000, // Tempo de espera antes de considerar uma falha (ms)
  errorThresholdPercentage: 50, // Porcentagem de falhas para abrir o circuito
  resetTimeout: 30000 // Tempo para tentar fechar o circuito (ms)
};

// Mapeamento de serviços para portas
const servicePorts = {
  order: 3101,
  image: 3102,
  notification: 3103
};

// Função para criar um Circuit Breaker para um serviço específico
const createCircuitBreaker = (serviceName: string) => {
  const servicePort = servicePorts[serviceName];
  const proxy = expressHttpProxy(`http://localhost:${servicePort}`);
  return new CircuitBreaker(proxy, breakerOptions);
};

// Cria um objeto que armazena os Circuit Breakers para cada serviço
const circuitBreakers = Object.keys(servicePorts).reduce((acc, key) => {
  acc[key] = createCircuitBreaker(key);
  return acc;
}, {} as Record<string, CircuitBreaker>);

// Middleware que intercepta todas as requisições
app.use('/', (req, res, next) => {
  // Extrai o nome do serviço a partir do caminho da requisição
  const serviceName = req.path.split('/')[1];
  // Recupera o Circuit Breaker correspondente ao serviço
  const circuitBreaker = circuitBreakers[serviceName];
  if (circuitBreaker) {
    // Executa a requisição através do Circuit Breaker
    circuitBreaker.fire(req, res).catch(next);
  } else {
    // Se o serviço não for encontrado, retorna erro 502
    res.status(502).send('Service not found.');
  }
});

// Inicia o servidor na porta especificada
app.listen(3100, () => {
  console.log('API Gateway running!');
});