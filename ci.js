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
const chalk = require('chalk');
const ora = require('ora');
let package = require("./package.json");

module.exports = function() {
    /**
     * 更新package.json版本号
     */
    const updatePackage = () => {
        const version = package.version;
        const versionArray = version.split('.');
        // 版本+1
        versionArray[versionArray.length - 1] = ~~versionArray[versionArray.length - 1] + 1;
        package.version = versionArray.join('.');
        fs.writeFileSync('./package.json', JSON.stringify(package, null, 4));
        console.log('升级package.json完成! 版本: ' + package.version);
        return package.version;
    }

    /**
     * @param {String} version 
     */
    const updateMD = ({
        version
    }) => {
        const file = './README.md'
        const content = fs.readFileSync(file, 'utf8');
        const newContent = content.replace(/(### 版本)([\s|\S]*)(### 演示)/g, (a, b, c, d) => {
            return b + '\r\n\r\n' + version + '\r\n\r\n' + d;
        });
        fs.writeFileSync(file, newContent);
        console.log('升级md完成! 版本: ' + version);
    }

    const version = updatePackage();
    updateMD({
        version
    });
    // 切换到master分支
    console.log(chalk.black.bgGreen('git开始!\n'));
    shell.exec('git checkout master');
    shell.exec('git add -A');
    shell.exec(`git commit -m ":zap: [build] "${version}`);
    shell.exec(`git push`);
    console.log(chalk.black.bgGreen('git同步完成!\n'));

    console.log(chalk.black.bgGreen('正在发布到npm...\n'));
    shell.exec(`npm publish`);
    console.log(chalk.black.bgGreen('发布到npm成功!\n'));
}