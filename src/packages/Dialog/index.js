import Vue from 'vue';
import ADialog from './Dialog';
export default ADialog;

// 语言库
import locale from '@/locale';

import DomPortal from 'vue-dom-portal';
Vue.use(DomPortal);

// 创建子类方法
import createApp from '@/utils/createApp'

// 快捷方法
import AAlert from './Alert.vue';
import AConfirm from './Confirm.vue';
import APrompt from './Prompt.vue';

// 全局配置
import {
    getConfig
} from '@/packages/config/index.js';

/**
 * Alert
 * @param {Object}} 内容 
 * @param {Object} 其他参数 
 */
const Alert = (content, {
    title,
    align = getConfig('DIALOG_ALIGN'),
    onOk = () => {},
    okText = locale.t('alert.ok')
} = {}) => {
    let vm = createApp(Vue, AAlert);
    vm.isShow = true;
    vm.title = title;
    vm.content = content;
    vm.align = align;
    vm.okText = okText;
    vm.onOk = onOk;
    vm.$on('update:isShow', isShow => {
        vm.isShow = isShow;
    });
    return vm;
};
/**
 * Confirm
 * @param {Object}} 内容 
 * @param {Object} 其他参数 
 */
const Confirm = (content, {
    title,
    align = getConfig('DIALOG_ALIGN'),
    onOk = () => {},
    onCancel = () => {},
    okText = locale.t('confirm.ok'),
    cancelText = locale.t('confirm.cancel')
} = {}) => {
    let vm = createApp(Vue, AConfirm);
    vm.isShow = true;
    vm.title = title;
    vm.content = content;
    vm.align = align;
    vm.okText = okText;
    vm.cancelText = cancelText;
    vm.onOk = onOk;
    vm.onCancel = onCancel;
    vm.$on('update:isShow', isShow => {
        vm.isShow = isShow;
    });
    return vm;
};

/**
 * Prompt
 * @param {Object}} 内容 
 * @param {Object} 其他参数 
 */
const Prompt = (title = '', {
    onOk = () => {},
    onCancel = () => {},
    align = getConfig('DIALOG_ALIGN'),
    okText = locale.t('prompt.ok'),
    cancelText = locale.t('prompt.cancel'),
    placeHolder = locale.t('prompt.placeHolder')
} = {}) => {
    let vm = createApp(Vue, APrompt);
    vm.isShow = true;
    vm.title = title;
    vm.align = align;
    vm.onOk = onOk;
    vm.onCancel = onCancel;
    vm.okText = okText;
    vm.cancelText = cancelText;
    vm.placeHolder = placeHolder;
    vm.$on('update:isShow', isShow => {
        vm.isShow = isShow;

    });
    return vm;
};

export {
    Alert,
    Confirm,
    Prompt
}