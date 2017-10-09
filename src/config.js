require('dotenv').config()
/* eslint-disable no-process-env */
const requireEnvs = require('./util/require-envs');

// Env vars should be casted to correct types
const config = {
  PORT: Number(process.env.PORT) || 9000,
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  GITHUB_API_TOKEN: process.env.GITHUB_API_TOKEN,
  GITHUB_USERNAME: process.env.GITHUB_USERNAME,
};

requireEnvs(Object.keys(config));

module.exports = config;

