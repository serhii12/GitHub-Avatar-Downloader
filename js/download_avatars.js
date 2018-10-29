// Get all of the tool
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

const downloadImageByURL = (url, filePath) => {
  request(url, { json: true }, (err, res) => {
    if (err) throw err;
    console.log('Response Status Code:', res.statusCode);
    fs.mkdir('../avatar', { recursive: true }, err => {
      if (err) throw err;
      fs.createWriteStream(filePath).on('finished', () => {
        console.log('Download completed...');
      });
    });
  });
};

downloadImageByURL(
  'https://avatars2.githubusercontent.com/u/2741?v=3&s=466',
  '../avatars/kvirani.jpg'
);

// getRepoContributors('jquery', 'jquery', (err, result) => {
//   if (err) throw err;
//   result.forEach(user => {
//     console.log(user.avatar_url);
//   });
// });
