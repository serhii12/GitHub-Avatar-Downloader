const request = require('request');
const fs = require('fs');
const token = require('./secret');

const getRepoContributors = (repoOwner, repoName, callback) => {
  const options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      Authorization: token,
    },
  };
  request(options, (err, res, body) => {
    callback(err, JSON.parse(body));
  });
};

getRepoContributors('jquery', 'jquery', (err, result) => {
  console.log('Errors:', err);
  console.log('Result:', result);
});
