/*
 * Data Source for Github API
 */
const BPromise = require('bluebird');
const logger = require('../util/logger')(__filename);
const request = require('request-promise');

class GithubDatasource {
  constructor(authInfo) {
    logger.info('Initializing Github DataSource type', authInfo.type);
    if (authInfo.type != 'userToken') {
      throw new Error('The only acceptable Github Auth Type is currently basic/user token');
    }

    if (authInfo.type == 'userToken') {
      this.auth = {
        user: authInfo.username,
        pass: authInfo.token,
        sendImmediately: true
      }
    }

    this.defaultProps = {
      auth: this.auth,
      baseUrl: 'https://api.github.com',
      method: 'GET',
      json: true,
      headers: {
        'User-Agent': 'Node.js'
      }
    }

  }

  getBasicUserInfo() {
    logger.info('githubDataSource: getBasicUserInfo')
    return request({
      ...this.defaultProps,
      uri: '/user',
    }).catch((e) => {
      logger.error('githubDataSource: getBasicUserInfo - ', e.statusCode)
      return [];
    })
  }

  getRepositories() {
    logger.info('githubDataSource: getRepositories')
    return request({
      ...this.defaultProps,
      uri: '/user/repos',
    }).catch((e) => {
      logger.error('githubDataSource: getRepositories - ', e.statusCode)
      return [];
    })
  }

  getCommitsForRepo(fullName) {
    logger.info('githubDataSource: getCommitsForRepo', fullName)
    return request({
      ...this.defaultProps,
      uri: `/repos/${fullName}/commits`,
    }).catch((e) => {
      logger.error('githubDataSource: getCommitsForRepo - ', e.statusCode)
      return [];
    })
  }

  getPullsForRepo(fullName) {
    logger.info('githubDataSource: getPullsForRepo', fullName)
    return request({
      ...this.defaultProps,
      uri: `/repos/${fullName}/pulls`,
    }).catch((e) => {
      logger.error('githubDataSource: getPullsForRepo - ', e.statusCode)
      return [];
    })
  }

}

function getGithubDatasourceWithUserToken(username, token) {
  return new GithubDatasource({
    token,
    username,
    type: 'userToken'
  });
}

module.exports = {
  getGithubDatasourceWithUserToken
}
