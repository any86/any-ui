// atom全局设置
let _configs = {};
export function addConfig(key, value) {
    _configs[key] = value;
};

export function setConfigs(configs) {
    _configs = configs;
};

export function getConfigs() {
    return _configs;
};

export function getConfig(key) {
    return _configs[key];
};