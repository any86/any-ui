import defaultLang from '@/locale/lang/zh-CN';
let lang = defaultLang;
const use = () => {};

/**
 * 翻译
 * @param {String} 语言路径 
 */
const t = path => {
    let pathArray = path.split('.');
    let lastPart = lang;
    for (let sectionPath of pathArray) {
        lastPart = lastPart[sectionPath];
    }
    return lastPart;
};



export {
    use,
    t
};