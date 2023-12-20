import Order from "../models/order";

class JSONtoSQLAdapter {
  static adaptCreate(order: Partial<Order>) {
    const columns = Object.keys(order).join(", ");
    const placeholders = Object.keys(order)
      .map(() => "?")
      .join(", ");
    const values = Object.values(order);
    const sql = `INSERT INTO Orders (${columns}) VALUES (${placeholders}) RETURNING *`;
    return { sql, values };
  }

  static adaptRead(id: string) {
    const sql = "SELECT * FROM Orders WHERE id = ?";
    const params = [id];
    return { sql, params };
  }

  static adaptListByUserID(userID: string) {
    const sql = "SELECT * FROM Orders WHERE userID = ?";
    const params = [userID];
    return { sql, params };
  }

  static adaptListAll() {
    const sql = "SELECT * FROM Orders";
    return { sql, params: [] };
  }

  static adaptUpdate(order: Partial<Order>) {
    const orderID = order.id;
    delete order.id;

    const columns = Object.keys(order)
      .map((key) => `${key} = ?`)
      .join(", ");
    const params = Object.values(order);
    params.push(String(orderID));

    const sql = `UPDATE Orders SET ${columns} WHERE id = ? RETURNING *`;
    return { sql, params };
  }

  static adaptDelete(id: string) {
    const sql = "DELETE FROM Orders WHERE id = ? RETURNING *";
    const params = [id];
    return { sql, params };
  }
}

export { JSONtoSQLAdapter };
