# Architecture
Our app is architected after the following examples:

https://github.com/kimmobrunfeldt/express-example
https://github.com/alvarcarto/url-to-pdf-api

* `app.js` is a factory that creates the express app, allowing us to test the app as a whole.
* Configuration is done at runtime via environment variables specified in `config.js`.
* The `router.js` contains middleware for logging requests and translating responses from endpoints into HTTP responses
* `endpoints` validate requests and return promises via calling `services`
* `services` are interfaces to business logic scripts that return interfaces. This folder is unaware of `HTTP` and every function returns a `Promise`.
* `models` are database-independent interfaces to data storage objects. An example is provided when a database must be implemented.


# How to Run

## Locally

* Create a `.env` file containing the variables defined in `config.js`
* `npm install`
* run `npm start`

The server will run on whatever port is specified in `.envrc`
