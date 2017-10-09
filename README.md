# Overview

This api uses Basic token auth to view high level overview information about a github user
which is specified at runtime. It has a single endpoint, `/githubPayload` and currently runs over HTTP.

# Architecture
Our app is architected after the following examples:

https://github.com/kimmobrunfeldt/express-example
https://github.com/alvarcarto/url-to-pdf-api

* `app.js` is a factory that creates the express app, allowing us to test the app as a whole.
* Configuration is done at runtime via environment variables specified in `config.js`.
* The `router.js` contains middleware for logging requests and translating responses from endpoints into HTTP responses
* `endpoints` validate requests and return promises via calling `services`
* `services` is the business logic layer. This folder is unaware of `HTTP` and every function returns a `Promise`.
* `data` is the data access layer, containing database-independent interfaces to data storage objects and external API data sources (such as Github.).


# Installation

## Dependencies
* Node.js 8.3+
* NPM

## Booting the App
* Create a `.env` file containing the variables defined in `config.js`
* Create a github [Personal Access Token](https://github.com/settings/tokens) for Basic Authentication and specify it as `GITHUB_API_TOKEN` in `.env`
* `npm install`
* run `npm start`

The server will run on whatever port is specified in `.env`

Visit `localhost:PORT/githubPayload` to see the github information for your account.

## Deploying
An example of this app is deployed using my github token and username on a personal heroku instance at the following URL:

`https://fathomless-savannah-16884.herokuapp.com/githubPayload`

To spin up your own heroku instance run the following commands:

`heroku create`
`git push heroku master`
`heroku config:set PORT=80`
`heroku config:set NODE_ENV=production`
`heroku config:set LOG_LEVEL=info`
`heroku config:set GITHUB_API_TOKEN=YOUR GITHUB TOKEN`
`heroku config:set GITHUB_USERNAME=YOUR GITHUB USERNAME`
and any other configuration parameters which must be set.
`heroku open`

Then visit the `/githubPayload` endpoint.

# Next Steps

Now that we've implemented the github payload endpoint with Basic Authentication, it is easy to add
OAuth. This will allow multiple users to authenticate their Github accounts with your app. Basic auth should not be used in production.

In order to do set up OAuth, refer to the documentation [https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/](Here), use an OAuth client such as [https://github.com/lelylan/simple-oauth2](This one), and store the OAuth tokens for each user in your datastore.

I would recommend using `Sequelize` with `PostgresQL` as a flexible SQL option.

