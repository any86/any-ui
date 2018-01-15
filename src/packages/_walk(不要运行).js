const fs = require("fs");
const dirs = fs.readdirSync('./');
let floders = [];
let componentNames = [];
dirs.forEach(value => {
    const isDirectory = fs.statSync(value).isDirectory();
    if (isDirectory) {
        if (-1 == ['Icon', 'Svg', 'Video', 'View'].indexOf(value)) {
            componentNames.push(`V${value}`);
            floders.push(`import V${value} from './${value}/${value}';`);
        }
    }
});

let code = floders.join('\r\n');
code += `\r\n\r\nexport {${componentNames.join(', ')}}`

fs.writeFileSync('./components.js', code, 'utf8');


console.log('done')