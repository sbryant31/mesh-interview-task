const epUtils = require('../util/endpoint');
const githubService = require('../services/github-service');
const BPromise = require('bluebird');

var getDataPayload = epUtils.createJsonRoute((req, res) => {
  return BPromise.resolve({hello: 'world'});

  /*
    if (isNan(userId)) {
      var err = new Error('User id parameter should be a number');
      err.status = 400;
      throw err;
    }
  */

});

module.exports = {
  getDataPayload
};
