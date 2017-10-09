const epUtils = require('../util/endpoint');
const githubService = require('../services/github-service');
const logger = require('../util/logger')(__filename);
const BPromise = require('bluebird');

var getDataPayload = epUtils.createJsonRoute((req, res) => {
  logger.info('instantiating githubService to get user info');
  return githubService.getUserInfo();

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
