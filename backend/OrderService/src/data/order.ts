import Order from "../models/order";
import { JSONtoSQLAdapter } from "./JSONtoSQLAdapter";
import * as sqlite3 from "sqlite3";

interface IOrderRepository {
  create(order: Partial<Order>): Promise<Order>;
  read(id: number): Promise<Order | null>;
  listByUserID(userID: number): Promise<Order[] | null>;
  listAll(): Promise<Order[] | null>;
  update(order: Partial<Order>): Promise<Order>;
  delete(id: number): Promise<Order>;
}

class OrderRepositoryBDR implements IOrderRepository {
  db = new sqlite3.Database(require.main === module ? "./database.sqlite":"./src/data/database.sqlite", (error) => {
    if (error) {
      console.error(error.message);
      throw error;
    }
    console.log("Conexão com o banco de dados estabelecida.");
  });
  jsonToSQLAdapter = new JSONtoSQLAdapter("Orders");

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
    const { sql, values } = this.jsonToSQLAdapter.adaptCreate(order);
    try {
      const row = await this.doWriteSql(sql, values);
      return row;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  async read(id: number): Promise<Order | null> {
    const { sql, params } = this.jsonToSQLAdapter.adaptRead(id);
    try {
      const orders = await this.doReadSql(sql, params);
      return orders[0] || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async listByUserID(userID: number): Promise<Order[] | null> {
    const { sql, params } = this.jsonToSQLAdapter.adaptListByUserID(userID);
    try {
      const orders = await this.doReadSql(sql, params);
      return orders || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async listAll(): Promise<Order[] | null> {
    const { sql, params } = this.jsonToSQLAdapter.adaptListAll();
    try {
      const orders = await this.doReadSql(sql, params);
      return orders || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
  async update(order: Partial<Order>): Promise<Order> {
    const { sql, params } = this.jsonToSQLAdapter.adaptUpdate(order);
    try {
      const row = await this.doWriteSql(sql, params);
      return row;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  async delete(id: number): Promise<Order> {
    const { sql, params } = this.jsonToSQLAdapter.adaptDelete(id);
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
  read(id: number): Promise<Order | null> {
    throw new Error("Method not implemented.");
  }
  listByUserID(userID: number): Promise<Order[] | null> {
    throw new Error("Method not implemented.");
  }
  listAll(): Promise<Order[] | null> {
    throw new Error("Method not implemented.");
  }
  update(order: Partial<Order>): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<Order> {
    throw new Error("Method not implemented.");
  }
}

class OrderCollection {
  private orderRepository: IOrderRepository;

  constructor(orderRepository: IOrderRepository) {
    this.orderRepository = orderRepository;
  }
  create(order: Partial<Order>): Promise<Order> {
    return this.orderRepository.create(order);
  }
  read(id: number): Promise<Order | null> {
    return this.orderRepository.read(id);
  }
  listByUserID(userID: number): Promise<Order[] | null> {
    return this.orderRepository.listByUserID(userID);
  }
  listAll(): Promise<Order[] | null> {
    return this.orderRepository.listAll();
  }
  update(order: Partial<Order>): Promise<Order> {
    return this.orderRepository.update(order);
  }
  delete(id: number): Promise<Order> {
    return this.orderRepository.delete(id);
  }
}

export { IOrderRepository, OrderRepositoryBDR, OrderRepositoryNR, OrderCollection };

// Teste de uso da interface
if (require.main === module) {  
  const orderRepository = new OrderRepositoryBDR();
  const orderCollection = new OrderCollection(orderRepository);

  // const myorder = orderCollection.create({
  //     name: "Dário",
  //     type: "resident",
  //     apartment: "302",
  //     email: "dgsv@cin.ufpe.br"
  // })
  // console.log(myorder)

}
