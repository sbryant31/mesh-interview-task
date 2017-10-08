/**
 * index.js - bootstraps the server and loads configuration, logging and other system utilities
 * Based on the architecture provided in https://github.com/alvarcarto/url-to-pdf-api
 *
 */
const createApp = require('./app');
const Promise = require('bluebird');
const logger = require('./util/logger')(__filename);
const config = require('./config');

Promise.config({
  warnings: config.NODE_ENV !== 'production',
  longStackTraces: true,
});

const app = createApp();
const server = app.listen(config.PORT, () => {
  logger.info(
    'Express server listening on http://localhost:%d/ in %s mode',
    config.PORT,
    app.get('env')
  );
});
