import {
  IOrderRepository,
  OrderRepositoryBDR,
  OrderRepositoryNR,
} from "./order";
import { IUserRepository, UserRepositoryBDR, UserRepositoryNR } from "./user";

interface AbstractRepositoryFactory {
  createOrderRepository(): IOrderRepository;
  createUserRepository(): IUserRepository;
}

class BDRRepositoryFactory implements AbstractRepositoryFactory {
  createOrderRepository(): IOrderRepository {
    return new OrderRepositoryBDR();
  }

  createUserRepository(): IUserRepository {
    return new UserRepositoryBDR();
  }
}

class NRRepositoryFactory implements AbstractRepositoryFactory {
  createOrderRepository(): IOrderRepository {
    return new OrderRepositoryNR();
  }

  createUserRepository(): IUserRepository {
    return new UserRepositoryNR();
  }
}

export { AbstractRepositoryFactory, BDRRepositoryFactory, NRRepositoryFactory };
