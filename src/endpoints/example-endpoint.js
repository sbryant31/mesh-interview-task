const epUtils = require('../util/endpoint');
const BPromise = require('bluebird');

var testEndpoint = epUtils.createJsonRoute((req, res) => {
  const result = Math.random();
  if (result < 0.5) {
    var err = new Error(`Result < 0.5 ${result}`);
    err.status = 400;
    throw err;
  } else {
    return BPromise.resolve({result, success: true});
  }

});

module.exports = {
  testEndpoint
};
