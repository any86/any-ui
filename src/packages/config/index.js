import snakeCase from 'lodash/snakeCase';
import * as DEFAULT from './default.js';
// atom全局设置
let _configs = DEFAULT;


export function addConfig(key, value) {
    _configs[key] = value;
};

/**
 * 覆盖配置
 * @param {Object} 新配置
 */
export function coverConfigs(configs) {
    _configs = configs;
};

/**
 * 合并配置
 * @param {Object} 新配置 
 */
export function mergeConfigs(newConfigs) {
    _configs = { ..._configs,
        ...newConfigs
    };
};

/**
 * 获取当前所有配置
 */
export function getConfigs() {
    return _configs;
};

/**
 * 获取指定配置
 * @param {String} 配置项键值 
 */
export function getConfig(key) {
    // console.log(key, _configs[key])
    // return _configs[snakeCase(key).toUpperCase() || key];
    return _configs[key];
};