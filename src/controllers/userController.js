// const services = require('../services/index');
// const config = require('../config/config');

/**
 * @typedef { import("../repositories/CustomerRepository") } CustomerRepository
 * @typedef { import("../entities/CustomerEntity") } CustomerEntity
 */

/**
 * @typedef AppLocals
 * @type {object}
 * @property {CustomerRepository} customerRepository
 */

/**
 * @typedef ExpressApp
 * @type {object}
 * @property {AppLocals} locals
 */

/**
 * @typedef ExpressReq
 * @type {object}
 * @property {ExpressApp} app
 */

/**
 * @typedef ExpressResp
 * @type {object}
 * @property {function} sendJson
 */

/**
 * @param {ExpressReq} req
 * @param {ExpressResp} res
 */

exports.getUserAction = async function (req, res) {
  /** @type {ExpressReq} req */
  /** @type {CustomerEntity} entity */
  const entity = req.app.locals.customerRepository.getNewEntity();
  entity.name = 'saifullah';
  entity.description = 'd test';
  entity.phone = Math.floor(Math.random() * 100);
  entity.created_at = new Date();
  req.app.locals.customerRepository.insertNew(entity).then(result => {
    const options = {
      limit: 4
      // sort: { _id: -1 },
      // projection: { phone: 1 }
    };
    req.app.locals.customerRepository.getByFilters({ name: 'saifullah' }, options).then(result => {
      res.sendJson(result.toArray());
    });
  });
};

exports.someErrorAction = async function (req, res) {
  throw new Error('BROKEN page');
}
