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
const packagePath = path.resolve(__dirname, '../package.json');
let package = require(packagePath);

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
    
    return willVersion;
}

const updatePackageVersion = willVersion=>{
    console.log(chalk.black.bgWhite(`当前版本: ${package.version}\n`));
    package.version = willVersion;
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 4), 'utf8');
    console.log(chalk.black.bgWhite(`更新后版本: ${willVersion}\n`));
}

module.exports = function() {
    // 修改package.json的版本号
    const willVersion = getNextVersion();
    updatePackageVersion(willVersion);
    // shell.exec(`npm version ${willVersion}`);
    
    // 同步git
    console.log(chalk.black.bgGreen('git开始!\n'));
    shell.exec('git add -A');
    shell.exec(`git commit -m ":zap: [build] "${willVersion}`);
    shell.exec(`git push`);
    console.log(chalk.black.bgGreen('git同步完成!\n'));
    
    // 发布到npm
    console.log(chalk.black.bgBlueBright('准备发布到npm...\n'));
    shell.exec(`npm publish`);
    console.log(chalk.black.bgBlueBright('发布到npm成功!, version: ' + willVersion));
}