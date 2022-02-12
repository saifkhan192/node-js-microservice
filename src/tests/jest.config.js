
module.exports = {
  testEnvironment: 'node', // to fix Error: Cross origin http://localhost forbidden
  roots: ['/app/src/tests'],
  //   modulePaths: ['./src/tests'],
  verbose: true,
  setupFilesAfterEnv: ['/app/src/tests/setupFilesAfterEnv.js']
//   https://doc.ebichu.cc/jest/docs/en/configuration.html
};
