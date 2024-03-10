import Order from "../models/order";
import User from "../models/user";

class JSONtoSQLAdapter {
  constructor(public table: string) {
    this.table = table;
  }

  adaptCreate(item: object) {
    const columns = Object.keys(item).join(", ");
    const placeholders = Object.keys(item)
      .map(() => "?")
      .join(", ");
    const values = Object.values(item);
    const sql = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`;
    return { sql, values };
  }

  adaptRead(id: number) {
    const sql = `SELECT * FROM ${this.table} WHERE id = ?`;
    const params = [id];
    return { sql, params };
  }

  adaptListByUserID(userID: number) {
    const sql = "SELECT * FROM Orders WHERE userID = ?";
    const params = [userID];
    return { sql, params };
  }

  adaptListAll() {
    const sql = `SELECT * FROM ${this.table}`;
    return { sql, params: [] };
  }

  adaptUpdate(item: object) {
    const id = item["id"];
    delete item["id"];

    const columns = Object.keys(item)
      .map((key) => `${key} = ?`)
      .join(", ");
    const params = Object.values(item);
    params.push(String(id));

    const sql = `UPDATE ${this.table} SET ${columns} WHERE id = ? RETURNING *`;
    return { sql, params };
  }

  adaptDelete(id: number) {
    const sql = `DELETE FROM ${this.table} WHERE id = ? RETURNING *`;
    const params = [id];
    return { sql, params };
  }
}

export { JSONtoSQLAdapter };
