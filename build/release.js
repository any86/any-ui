// #!/usr/bin/env node
// var inquirer = require('inquirer');
// inquirer.prompt([{
//     type: 'list',
//     message: 'which template do you need:',
//     name: 'template',
//     choices: ['normal', 'wap', 'h5']
// }]).then(function (answers) {
//     console.log(answers)
//     done();
// })     
const shell = require("shelljs");
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
let package = require("../package.json");

/**
 * 更新package.json版本号
 * @return {String} 新版本号
 */
const getNextVersion = () => {
    const version = package.version;
    const versionArray = version.split('.');
    // 版本+1
    versionArray[versionArray.length - 1] = ~~versionArray[versionArray.length - 1] + 1;
    const willVersion = versionArray.join('.');
    console.log(chalk.black.bgWhite(`版本变化: ${version} => ${willVersion}`));
    return willVersion;
}

module.exports = function() {
    const willVersion = getNextVersion();
    // 切换到master分支
    console.log(chalk.black.bgGreen('git开始!\n'));
    // shell.exec('git checkout master');
    shell.exec('git add -A');
    shell.exec(`git commit -m ":zap: [build] "${willVersion}`);
    shell.exec(`git push`);
    console.log(chalk.black.bgGreen('git同步完成!\n'));
    // 修改package.json的版本号
    shell.exec(`npm version ${willVersion}`);
    console.log(chalk.black.bgBlueBright('准备发布到npm...\n'));
    shell.exec(`npm publish`);
    console.log(chalk.black.bgBlueBright('发布到npm成功!, version: ' + willVersion));
}