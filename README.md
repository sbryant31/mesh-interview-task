# Architecture
Our app is architected after the following examples:

https://github.com/kimmobrunfeldt/express-example
https://github.com/alvarcarto/url-to-pdf-api

* `app.js` is a factory that creates the express app, allowing us to test the app as a whole.
* Configuration is done at runtime via environment variables.
* The `router.js` contains middleware for logging requests and translating responses from endpoints into HTTP responses
* `endpoints` validate requests and return promises via calling `services`
* `services` are interfaces to business logic scripts that return interfaces.
* `models` are database-independent interfaces to data storage objects


# How to Run

## Locally

## Heroku

## Docker
