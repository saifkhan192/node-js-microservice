// PostgresDB Repository
class UserRepository {
  constructor(db) {
    this.db = db;
  }

  async getUsers() {
    let users = await this.db.query("SELECT * FROM users limit 10 ");
    return users.rows;
  }
}

module.exports = UserRepository;
