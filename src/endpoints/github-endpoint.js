var epUtils = require('../utils/endpoint');
var githubService = require('../services/github-service');

var getUser = epUtils.createJsonRoute((req, res) => {
    // "Unwrap" the HTTP request
    // Take all needed input parameters from the request, and pass it
    // to lower level core, which shouldn't know about HTTP in general.
    var userId = req.params.userId;

    if (isNan(userId)) {
      var err = new Error('User id parameter should be a number');
      err.status = 400;
      throw err;
    }

    return userCore.getUserById(userId)
    .then(user => {
        if (!user) {
            var err = new Error('User does not exist.');
            err.status = 404;
            throw err;
        }

        return user;
    });
});

module.exports = {
  getUser: getUser
};
