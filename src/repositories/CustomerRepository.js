const MongoRepository = require('../repositories/MongoRepository');
const CustomerEntity = require('../entities/CustomerEntity');

class CustomerRepository extends MongoRepository {
  constructor (dbs) {
    super(dbs.dbMain, 'customer', CustomerEntity)
  }

  getCustomer () {
    return 'ok';
  }
}

module.exports = CustomerRepository;
