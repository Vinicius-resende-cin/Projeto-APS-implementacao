import { IOrderRepository, OrderRepositoryBDR, OrderRepositoryNR } from "./order";

interface AbstractRepositoryFactory {
  createOrderRepository(): IOrderRepository;
}

class BDRRepositoryFactory implements AbstractRepositoryFactory {
  createOrderRepository(): IOrderRepository {
    return new OrderRepositoryBDR();
  }
}

class NRRepositoryFactory implements AbstractRepositoryFactory {
  createOrderRepository(): IOrderRepository {
    return new OrderRepositoryNR();
  }
}

export { AbstractRepositoryFactory, BDRRepositoryFactory, NRRepositoryFactory };
