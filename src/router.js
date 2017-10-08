const _ = require('lodash');
const express = require('express');
const config = require('./config');
const logger = require('./util/logger')(__filename);
const githubEndpoint = require('./endpoints/github-endpoint');

function createRouter() {
  const router = express.Router();

  router.get('/githubPayload', githubEndpoint.getPayload);

  return router;
}

module.exports = createRouter;
