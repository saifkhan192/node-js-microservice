
class UserEntity {
  constructor (dbData) {
    // super(dbData)
    this.importFromMysql(dbData);
  }

  importFromMysql (data) {
    this.id = data.id || null;
    this.name = data.name || null;
    this.phone = data.phone || null;
    // this.created_at = this.created_at != null ? new Date('2021-05-10T15:22:12.000Z') : null;
    this.created_at = new Date('2021-05-10T15:22:12.000Z');
  }

  exportToMysql () {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      created_at: this.created_at || new Date()
    }
  }

  toArray () {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      created_at: this.created_at != null ? new Date(this.created_at) : null
    }
  }

  getDetails () {
    return this.name + ' (phone# ' + this.phone + ')'
  }
}

module.exports = UserEntity;
