const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('./util/logger')(__filename);
const errorResponder = require('./middleware/error-responder');
const requireHttps = require('./middleware/require-https');
const createRouter = require('./router');
const config = require('./config');

function createApp() {
  const app = express();
  // App is served behind Heroku's router.
  // This is needed to be able to use req.ip or req.secure
  app.enable('trust proxy', 1);
  app.disable('x-powered-by');

  app.use(function errorLogger(err, req, res, next) {
    const status = err.status ? err.status : 500;

    if (status >= 400) {
      console.error('Request headers:');
      console.error(JSON.stringify(req.headers));
      console.error('Request parameters:');
      console.error(JSON.stringify(req.params));
    }

    if (process.env.NODE_ENV === 'test' && status >= 500 ||
        process.env.NODE_ENV === 'development'
    ) {
        console.log(err.stack);
    }

    next(err);
  });

  app.use(function errorResponder(err, req, res, next) {
      const status = err.status ? err.status : 500;
      const httpMessage = http.STATUS_CODES[status];

      let message;
      if (status < 500) {
          message = httpMessage + ': ' + err.message;
      } else {
          message = httpMessage;
      }

      let response = {message: message};
      if (err.data) {
          response.errors = err.data;
      }

      res.status(status);
      res.send(response);
  });


  if (config.NODE_ENV !== 'production') {
    app.use(morgan('dev'));
  }

  const corsOpts = {
    origin: config.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD', 'PATCH'],
  };
  logger.info('Using CORS options:', corsOpts);
  app.use(cors(corsOpts));
  app.use(bodyParser.json({ limit: '1mb' }));

  // Initialize routes
  const router = createRouter();
  app.use('/', router);

  app.use(errorResponder());

  return app;
}

module.exports = createApp;

