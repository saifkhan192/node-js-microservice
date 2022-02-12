const MongoBaseEntity = require('../entities/MongoBaseEntity');

// /**
//  * @typedef CustomerEntity
//  * @type {object}
//  * @property {string} id - an ID.
//  * @property {string} saif - your name.
//  * @property {number} phone - your phone
//  */

class CustomerEntity extends MongoBaseEntity {
//   constructor (dbData) {
//     super(dbData)
//   }

  importFromMongo (data) {
    this.id = data._id || null;
    this.name = data.name || null;
    this.phone = data.phone || null;
    this.created_at = data.created_at || null;
  }

  exportToMongo () {
    return {
      _id: this.id,
      name: this.name,
      phone: this.phone,
      created_at: this.created_at || new Date()
    }
  }

  toArray () {
    // console.log(this);
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
      created_at: this.created_at || new Date()
    }
  }

  getDetails () {
    return this.name + ' (phone# ' + this.phone + ')'
  }
}

module.exports = CustomerEntity;
