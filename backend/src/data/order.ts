import Order from "../models/order";
import { JSONtoSQLAdapter } from "./JSONtoSQLAdapter";
import sqlite3 from "sqlite3";

interface IOrderRepository {
  create(order: Partial<Order>): Promise<Order>;
  read(id: string): Promise<Order | null>;
  listByUserID(userID: string): Promise<Order[] | null>;
  listAll(): Promise<Order[] | null>;
  update(order: Partial<Order>): Promise<Order>;
  delete(id: string): Promise<Order>;
}

class OrderRepositoryBDR implements IOrderRepository {
  db = new sqlite3.Database("./src/data/database.sqlite", (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    console.log("Conexão com o banco de dados estabelecida.");
  });

  doReadSql(sql: string, params: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows: Order[]) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
  doWriteSql(sql: string, params: any[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row: Order) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  async create(order: Partial<Order>): Promise<Order> {
    const { sql, values } = JSONtoSQLAdapter.adaptCreate(order);
    try {
      const row = await this.doWriteSql(sql, values);
      return row;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  async read(id: string): Promise<Order | null> {
    const { sql, params } = JSONtoSQLAdapter.adaptRead(id);
    try {
      const orders = await this.doReadSql(sql, params);
      return orders[0] || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async listByUserID(userID: string): Promise<Order[] | null> {
    const { sql, params } = JSONtoSQLAdapter.adaptListByUserID(userID);
    try {
      const orders = await this.doReadSql(sql, params);
      return orders || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async listAll(): Promise<Order[] | null> {
    const { sql, params } = JSONtoSQLAdapter.adaptListAll();
    try {
      const orders = await this.doReadSql(sql, params);
      return orders || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
  async update(order: Partial<Order>): Promise<Order> {
    const { sql, params } = JSONtoSQLAdapter.adaptUpdate(order);
    try {
      const row = await this.doWriteSql(sql, params);
      return row;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  async delete(id: string): Promise<Order> {
    const { sql, params } = JSONtoSQLAdapter.adaptDelete(id);
    try {
      const row = await this.doWriteSql(sql, params);
      return row;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }
}

class OrderRepositoryNR implements IOrderRepository {
  create(order: Partial<Order>): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  read(id: string): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
  listByUserID(userID: string): Promise<Order[] | null> {
    throw new Error("Method not implemented.");
  }
  listAll(): Promise<Order[] | null> {
    throw new Error("Method not implemented.");
  }
  update(order: Partial<Order>): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  delete(id: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

class OrderCollection {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }
  create(order: Order): Promise<Order> {
    return this.orderRepository.create(order);
  }
  read(id: string): Promise<Order | null> {
    return this.orderRepository.read(id);
  }
  listByUserID(userID: string): Promise<Order[] | null> {
    return this.orderRepository.listByUserID(userID);
  }
  listAll(): Promise<Order[] | null> {
    return this.orderRepository.listAll();
  }
  update(order: Partial<Order>): Promise<Order> {
    return this.orderRepository.update(order);
  }
  delete(id: string): Promise<Order> {
    return this.orderRepository.delete(id);
  }
}

export { IOrderRepository, OrderRepositoryBDR, OrderRepositoryNR, OrderCollection };
