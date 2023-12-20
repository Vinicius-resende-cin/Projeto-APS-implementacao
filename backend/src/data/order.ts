import Order from "../models/order";
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
    const columns = Object.keys(order).join(", ");
    const placeholders = Object.keys(order)
      .map(() => "?")
      .join(", ");
    const values = Object.values(order);

    const sql = `INSERT INTO Orders (${columns}) VALUES (${placeholders}) RETURNING *`;
    try {
      const row = await this.doWriteSql(sql, values);
      return row;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  async read(id: string): Promise<Order | null> {
    const sql = "SELECT * FROM Orders WHERE id = ?";
    const params = [id];
    try {
      const orders = await this.doReadSql(sql, params);
      return orders[0] || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async listByUserID(userID: string): Promise<Order[] | null> {
    const sql = "SELECT * FROM Orders WHERE userID = ?";
    const params = [userID];
    try {
      const orders = await this.doReadSql(sql, params);
      return orders || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }

  async listAll(): Promise<Order[] | null> {
    const sql = "SELECT * FROM Orders";
    try {
      const orders = await this.doReadSql(sql, []);
      return orders || null;
    } catch (error: any) {
      console.error(error.message);
      return null;
    }
  }
  async update(order: Partial<Order>): Promise<Order> {
    const orderID = order.id;
    delete order.id;

    const columns = Object.keys(order)
      .map((key) => `${key} = ?`)
      .join(", ");
    const params = Object.values(order);
    params.push(String(orderID));

    const sql = `UPDATE Orders SET ${columns} WHERE id = ? RETURNING *`;
    try {
      const row = await this.doWriteSql(sql, params);
      return row;
    } catch (error: any) {
      console.error(error.message);
      throw error;
    }
  }

  async delete(id: string): Promise<Order> {
    const sql = "DELETE FROM Orders WHERE id = ? RETURNING *";
    const params = [id];
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
