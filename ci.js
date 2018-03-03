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
var shell = require("shelljs");
shell.exec("npm run dev");
shell.exec("git checkout master");