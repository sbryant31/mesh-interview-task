/*
 * Service Layer for Github API
 * Contains a function to get a payload of information from a User's github.
 */
const githubData = require('../data/github-data');
const BPromise = require('bluebird');
const config = require('../config');
const logger = require('../util/logger')(__filename);

function getUserInfo() {
  const githubDatasource = githubData.getGithubDatasourceWithUserToken(config.GITHUB_USERNAME, config.GITHUB_API_TOKEN);
  return BPromise.all([
    githubDatasource.getBasicUserInfo(),
    githubDatasource.getRepositories()
  ]).spread((userInfo, repositories) => {
    // get pull and commit counts for each repository
    return BPromise.map(repositories, (repository) => {
      return BPromise.all([
        githubDatasource.getPullsForRepo(repository.full_name),
        githubDatasource.getCommitsForRepo(repository.full_name),
      ]).spread((pulls, commits) => {
        return {
          ...repository,
          pulls_count: pulls.length,
          commits_count: commits.length,
        }
      });
    }).then((repositories) => {
      return {
        user: {
          githubHandle: userInfo.login,
          githubURL: userInfo.url,
          avatarURL: userInfo.avatar_url,
          email: userInfo.email,
          followerCount: userInfo.followers,
          repositories: repositories.map((repo) => {
            return {
              name: repo.name,
              url: repo.url,
              commitCount: repo.commits_count,
              pullRequestCount: repo.pulls_count,
            }
          })
        }
      }
    });
  }).catch((e) => {
    logger.error('something happened', e);
  });
}

module.exports = {
  getUserInfo
}
