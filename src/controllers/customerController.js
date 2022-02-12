/**
* @typedef { import("../repositories/UserRepository") } UserRepository
* @typedef { import("../entities/UserEntity") } UserEntity
*/

class CustomerController {
  static getCustomerMysqlAction (req, res) {
    /** @type {UserRepository} */
    const userRepository = req.app.locals.userRepository;
    // userRepository.getNewEntity();
    userRepository.getById(100).then((userEntity) => {
      /** @type {UserEntity} userEntity */
      res.sendJson(userEntity.toArray());
      // userRepo.insertNew(userEntity).then((userEntity) => {
      //   console.log(userEntity);
      //   res.sendJson(userEntity.toArray());
      // });
    });
    // return CustomerController.getCustomer2(req, res);
    // res.status(502).sendJson({ post: "asd" });
    // res.sendJson({
    //   message: 'Data loaded successfully!',
    //   code: 200,
    //   data: 'customer-get2',
    //   time: new Date()
    // });
  }

  static getCustomerMongoAction (req, res) {
    try {
      req.app.getDependency('customerModel').registerCustomer().then((result) => {
        // console.log(req);
        // console.log(req.query);

        res.sendJson(result.toArray());
      });
    } catch (e) {
      console.error(e);
      res.sendError(500, e, { error: 1 });
    }

    // console.log(result);
    // res.sendJson(result.toArray());
    // res.sendJson('result.toArray()');

    return;
    const customerRepository = req.app.locals.customerRepository;
    const entity = customerRepository.getNewEntity();

    entity.name = 'test2';
    entity.description = 'd test';
    entity.phone = Math.floor(Math.random() * 100);
    //   entity.created_at = new Date();
    customerRepository.insertNew(entity).then(result => {
      // console.log(result);
      const options = {
        limit: 2,
        sort: { _id: -1 },
        projection: { phone: 1 }
      };
      customerRepository.getByFilters({ }, options).then(result => {
      //   console.log(result);
        res.sendJson(result.toArray());
      });
    });
  }
}

module.exports = CustomerController;
