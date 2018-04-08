const pathPackages = './src/packages';
const fs = require('fs');
const path = require('path');
const dirs = fs.readdirSync(pathPackages);


const mkStyleDir = (moduleName)=>{
    const path = `${pathPackages}/${moduleName}/style/`
    const isExist = fs.existsSync(path);
    if(isExist){
        fs.rmdir(path);
    } else {
        fs.mkdirSync(path);
    }
}

const writeStyleImport = moduleName=>{
    fs.writeFileSync(`${pathPackages}/${moduleName}/style/index.js`, 
    `import '../../../scss/global.scss';\r\nimport '../../../scss/components/${moduleName}.scss';`);
}

dirs.filter(module=>{
    if(fs.statSync(`${pathPackages}/${module}`).isDirectory()){
        console.log(module)
        mkStyleDir(module);
        writeStyleImport(module);
    }
});

// const a = path.relative(`${pathPackages}/xx/style`, './src/scss/');
// console.log(a);

// console.log(dirs);