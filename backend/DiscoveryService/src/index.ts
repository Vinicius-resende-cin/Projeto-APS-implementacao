// Importa as dependências necessárias
import consul from "consul";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Cria a instância do Consul
const client = new consul({
  host: "consul-server"
});

app.post("/", (req, res) => {
  const serviceName = req.query.name as string;
  const servicePort = parseInt(req.query.port as string);

  client.agent.service.register(
    {
      name: serviceName,
      port: servicePort
    },
    (err) => {
      if (err) {
        res.status(500).send("Error registering service");
        throw err;
      }

      console.log(`Service ${serviceName} registered`);
      res.send(`Service ${serviceName} registered`);
    }
  );
});

app.get("/", (req, res) => {
  const serviceName = req.query.name as string;

  client.agent.service.list((err, services: any) => {
    if (err) {
      res.status(500).send("Error fetching services");
      throw err;
    }

    const service = services[serviceName];

    if (!service) {
      res.status(404).send(`Service ${serviceName} not found`);
      throw new Error(`Service ${serviceName} not found`);
    }

    console.log(`Found service ${serviceName} at ${service.Address}:${service.Port}`);
    res.send(`http://${service.Address}:${service.Port}`);
  });
});

app.listen(3001, () => {
  console.log("Discovery rodando na porta 3001");
});
