/**
 * @typedef { import("../repositories/CustomerRepository") } CustomerRepository
 */
class CustomerModel {
  constructor (app) {
    this.application = app;
  }

  registerCustomer () {
    /** @type {CustomerRepository} */
    const customerRepository = this.application.getDependency('customerRepository');
    // const resp = this.application.getDependency('customerModel').registerCustomer();
    // const entity = this.application.locals.customerRepository.getNewEntity();
    const entity = customerRepository.getNewEntity();
    entity.name = 'test2';
    entity.description = 'd test';
    entity.phone = Math.floor(Math.random() * 100);
    return customerRepository.insertNew(entity).then(result => {
      const options = {
        limit: 2,
        sort: { _id: -1 },
        projection: { phone: 1 }
      };
      return customerRepository.getByFilters({}, options);
      //   customerRepository.getByFilters({ }, options).then(result => {
      //     Promise.resolve(result);
      //   //   console.log(result);
      //     // res.sendJson(result.toArray());
      //   });
    });
  }
}

module.exports = (app) => {
  app.locals.customerModel = new CustomerModel(app);
}
