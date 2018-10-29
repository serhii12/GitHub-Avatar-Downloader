// Get all of the tools
require('dotenv').config();
const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const owner = args[0];
const name = args[1];
const token = process.env.GITHUB_TOKEN;

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

const downloadImageByURL = (url, filePath) => {
  // Make a get request at specified endpoint, downloads each image specifed in previous response
  request
    .get(url)
    .on('error', err => {
      throw err;
    })
    .on('response', response => {
      console.log('Downloading image...');
    })
    .pipe(fs.createWriteStream(filePath))
    .on('end', () => {
      console.log('Download completed...');
    });
};

if (args.length === 2) {
  getRepoContributors(owner, name, (err, result) => {
    if (err) throw err;
    result.forEach(user =>
      downloadImageByURL(user.avatar_url, `../avatar/${user.login}.jpg`)
    );
  });
} else {
  console.log('Please provide arguments as follow: 1)<repoOwner> 2)<repoName>');
}
