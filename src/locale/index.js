// 默认语言为中文
import defaultLang from './lang/zh-CN';
let _activeLang = defaultLang;

/**
 * 切换语言包
 * @param {Object} 语言包
 */
export const use = (lang = defaultLang) => {
    _activeLang = lang
};

/**
 * 翻译
 * @param {String} 语言路径表达式 
 */
export const t = path => {
    let pathArray = path.split('.');
    let lastPart = _activeLang;
    for (let sectionPath of pathArray) {
        lastPart = lastPart[sectionPath];
    }
    return lastPart;
};

export default {
    use,
    t
};