import Vue from 'vue';
import ADialog from './Dialog';
export default ADialog;
import locale from '@/locale';

import DomPortal from 'vue-dom-portal';
Vue.use(DomPortal);
// 快捷方法
import AAlert from './Alert.vue';
import AConfirm from './Confirm.vue';
import APrompt from './Prompt.vue';


/**
 * 用指定组件创建一个vue实例
 * @param {Object} Vue构造函数
 * @param {Object} 组件对象 
 */
const createApp = (Vue, component) => {
    // 创建一个挂载点
    const node = document.createElement('div');
    node.id = `_app-${component.name}`;
    // 插入到文档最后
    document.body.appendChild(node);
    // 创建子类
    const VueSubClass = Vue.extend(component);
    // 挂载
    return new VueSubClass().$mount(`#${node.id}`);
}

const Dialog = () => {
    let vm = createApp(Vue, ADialog);
    vm.isShow = true;
    vm.content = 'i am alert!';
    return vm;
};

const Alert = (content, { title, align, onOk, okText } = {}) => {
    let vm = createApp(Vue, AAlert);
    vm.isShow = true;
    vm.title = title;
    vm.content = content;
    vm.align = align;
    vm.okText = okText || locale.t('alert.ok');
    vm.onOk = onOk;
    vm.$on('update:isShow', isShow => {
        vm.isShow = isShow;
    });
    return vm;
};

const Confirm = (content, { title, align, onOk, onCancel, okText, cancelText } = {}) => {
    let vm = createApp(Vue, AConfirm);
    vm.isShow = true;
    vm.title = title;
    vm.content = content;
    vm.align = align;
    vm.okText = okText || locale.t('confirm.ok');
    vm.cancelText = cancelText || locale.t('confirm.cancel');
    vm.onOk = onOk;
    vm.onCancel = onCancel;
    vm.$on('update:isShow', isShow => {
        vm.isShow = isShow;
    });
    return vm;
}

const Prompt = (title = '', {
    onOk = () => { },
    onCancel = () => { },
    align = 'top',
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

export { Dialog, Alert, Confirm, Prompt }
