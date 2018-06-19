var ghpages = require('gh-pages');
const shell = require('shelljs');

// 拷贝demo到docs/demo
let src = 'dist/* ';
let dest = 'docs/dist/demo';
shell.exec(`mkdir ${dest}`);
shell.exec(`mv ${src} ${dest}`);

// 发布
ghpages.publish('./docs/dist', {
    branch: 'gh-pages',
}, function(err) {
  console.log('docs同步完成!');
});