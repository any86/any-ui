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

/**
 * 更新package.json版本号
 */
const updateVersion = ()=>{
    const content = fs.readFileSync('./package.json','utf8');
    const json = JSON.parse(content);
    const version = json.version;
    const versionArray = version.split('.');
    versionArray[versionArray.length-1] = ~~versionArray[versionArray.length-1]+1;
    json.version = versionArray.join('.');
    fs.writeFileSync('./package.json', JSON.stringify(json, null, 4));
    console.log('升级package.json完成! 版本: '+ json.version);
    return json.version;
}

/**
 * @param {String} version 
 */
const updateMD = ({version})=>{
    const file = './README.md'
    const content = fs.readFileSync(file,'utf8');
    const newContent = content.replace(/(### 版本)([\s|\S]*)(### 演示)/g, (a,b,c,d)=>{
        return b+'\r\n\r\n' + version + '\r\n\r\n'+d;
    });
    fs.writeFileSync(file, newContent);
    console.log('升级md完成! 版本: '+ version);
}


// const version = updateVersion();
// updateMD({version});
// 切换到master分支
shell.exec('git checkout master');
shell.exec('git add -A');
shell.exec('git commit -m ":zap: [build] 2.9.1"');




