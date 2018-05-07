var ghpages = require('gh-pages');
ghpages.publish('public', {
    branch: 'gh-pages',
}, function(err) {
  console.log(err);
});