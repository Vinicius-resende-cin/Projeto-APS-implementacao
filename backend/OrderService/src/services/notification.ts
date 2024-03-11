import User from "../models/user";
import Order from "../models/order";
import CircuitBreaker from "opossum";
import expressHttpProxy from "express-http-proxy";
import express from "express";

const getServiceAddr = async (serviceName: string) => {
  return await fetch(`http://discovery:3001/?name=${serviceName}`)
    .then((res) => res.json())
    .catch((err) => {
      throw err;
    });
};

// Função para criar um Circuit Breaker para um serviço específico
const createCircuitBreaker = (serviceName: string) => {
  // Opções de configuração do Circuit Breaker
  const breakerOptions = {
    timeout: 5000, // Tempo de espera antes de considerar uma falha (ms)
    errorThresholdPercentage: 50, // Porcentagem de falhas para abrir o circuito
    resetTimeout: 30000 // Tempo para tentar fechar o circuito (ms)
  };

  console.log(`Creating Circuit Breaker for ${serviceName}`);

  // Assinatura de função que corresponde ao que o Circuit Breaker espera.
  const breakerFunction = async (user: User, order: Order, route: string): Promise<void> => {
    const servicePort = (await getServiceAddr(serviceName))["servicePort"];
    if (!servicePort) {
      throw new Error(`Service ${serviceName} not found`);
    }
    return new Promise<void>(async (resolve, reject) => {
      await fetch(`http://${serviceName}:${servicePort}/${route}`, {
        method: "POST",
        body: JSON.stringify({ user: user, order: order }),
        headers: { "Content-Type": "application/json" }
      })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  // new CircuitBreaker espera uma função que retorna uma Promise.
  return new CircuitBreaker(breakerFunction, breakerOptions);
};

const notificationServiceBreaker = createCircuitBreaker("notification");

export async function orderStatusChange(user: User, order: Order): Promise<void> {
  // Chama o serviço de notificação
  console.log(`Notificando usuário ${user.id} sobre a mudança de status do pedido ${order.id}...`);
  // Executa a requisição através do Circuit Breaker
  notificationServiceBreaker.fire(user, order, "orderStatusChange").catch((err) => {
    throw err;
  });
}
