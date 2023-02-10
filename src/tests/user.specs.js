const request = require('supertest');
const assert = require('assert');
const { setupApp, destroyApp } = require('./util');
const { app } = require('../app');
const services = require('../services');
const MockAdapter = require("axios-mock-adapter");

// Stub is a function definition that has correct function name, the correct number of parameters 
// and produces dummy result of the correct type.

// Tests written with mocks usually follow an initialize -> set expectations -> exercise -> verify pattern to testing.
// While the pre - written stub would follow an initialize -> exercise -> verify
// A mock is a smarter stub
// Stubs don't fail your tests, mock can.




describe('user-specs', () => {
  before(async () => {
    // silence the console
    console.log = console.warn = console.error = () => { };
    await setupApp();
    jokesService = new MockAdapter(services.jokesService);
  });
  after(destroyApp);

  it('GET /', (done) => {
    request(app).get('/').then((response) => {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('GET /client/1', (done) => {
    request(app).get('/client/1').then((response) => {
      assert.equal(response.statusCode, 200);
      done();
    });
  });

  it('GET /service/some-error', async function () {
    let response = await request(app).get('/service/some-error');
    assert.equal(response.statusCode, 400);
  });

  it('GET /service/jokes', async function () {
    jokesService.onGet("/joke/Programming").reply(200, { id: 1, thisIsMocked: true })
    let response = await request(app).get('/service/jokes');
    // console.log(response.text)
    assert.equal(response.statusCode, 200);
  });

});
