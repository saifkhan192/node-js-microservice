const request = require('supertest');

const expressApp = require('../app');
const { connectDbs, resetDbs, closeDbs } = require('../db');
const services = require('../services/index.js');

describe('user', () => {
  beforeAll(async (done) => {
    await connectDbs(expressApp);
    await resetDbs(expressApp);
    expressApp.startApp();

    // mock services
    const mockedInstance = { get: () => Promise.resolve('ok') };
    jest.spyOn(services, 'getApiInstance').mockImplementation(() => mockedInstance);

    done();
  });

  afterAll(async (done) => {
    await closeDbs(expressApp);
    // setTimeout(() => process.exit(), 1000);
    done();
  });

  beforeEach((done) => {
    done();
  });

  it('GET /user/get', async (done) => {
    return request(expressApp).get('/user/get')
      .then((response) => {
        // console.log(response.body);
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  // it('GET /customer/mysql', async (done) => {
  //   return request(app).get('/customer/mysql')
  //     .then((response) => {
  //       // console.log(response.body);
  //       expect(response.statusCode).toBe(200);
  //       done();
  //     });
  // });

  it('GET /customer/mongo', async (done) => {
    return request(expressApp).get('/customer/mongo')
      .then((response) => {
        // console.log(response.body);
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
