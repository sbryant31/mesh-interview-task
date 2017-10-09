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


# How to Run

## Dependencies
* Make sure you have node.js version 8.3+ installed locally

## Booting the App
* Create a `.env` file containing the variables defined in `config.js`
* Create a github [https://github.com/settings/tokens](Personal Access Token) for Basic Authentication and specify it as `GITHUB_API_TOKEN` in `.env`
* `npm install`
* run `npm start`

The server will run on whatever port is specified in `.env`

Visit `localhost:PORT/githubPayload` to see the github information for your account.

## Deploying
Deploying is beyond the scope of this project. The simplest deployment method would be to deploy to heroku with the Node.js buildpack. Visit [https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up](This url) for more information.

# Next Steps

Now that we've implemented the github payload endpoint with Basic Authentication, it is easy to add
OAuth. This will allow multiple users to authenticate their Github accounts with your app. Basic auth should not be used in production.

In order to do set up OAuth, refer to the documentation [https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/about-authorization-options-for-oauth-apps/](Here), use an OAuth client such as [https://github.com/lelylan/simple-oauth2](This one), and store the OAuth tokens for each user in your datastore.

I would recommend using `Sequelize` with `PostgresQL` as aflexible SQL option.

