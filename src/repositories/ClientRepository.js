const moment = require('moment');

// Mysql DB Repository

class ClientRepository {

  /** @param { import("mysql2/promise").Connection } db */
  constructor(db) {
    this.db = db;
  }

  async getById(id) {
    let [clients] = await this.db.query("SELECT * FROM clients WHERE id = ? ", [id]);
    if (clients.length > 0) {
      return clients[0]
    }
    throw { message: "Client not found", status: 404 }
  }

  async updateById(id, updates) {
    const [result] = await this.db.query(
      `UPDATE clients SET name = ?, email = ? WHERE id = ?; `,
      [updates.name, updates.email, id]
    );
    return result
  }

  async getClients() {
    let time = moment.utc().format("YYYY-MM-DD HH:mm:ss");
    // await this.db.query('UPDATE clients SET updated_at = UTC_TIMESTAMP() ', [])
    let [clients] = await this.db.query("SELECT * FROM clients limit 5");
    return clients;
  }
}

module.exports = ClientRepository;
