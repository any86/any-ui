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
    let vm = createApp(Vue, AAlert, {
        props: {
            isShow: true,
            title: title,
            content: content,
            align: align,
            okText: okText,
            onOk: onOk
        },
        on: {
            'update:isShow': isShow => {
                vm.isShow = isShow;
            }
        }
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
    let vm = createApp(Vue, AConfirm, {
        props: {
            isShow: true,
            title: title,
            content: content,
            align: align,
            okText: okText,
            cancelText: cancelText,
            onOk: onOk,
            onCancel: onCancel
        },

        on: {
            'update:isShow': isShow => {
                vm.isShow = isShow;
            }
        }
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
    let vm = createApp(Vue, APrompt, {
        props: {
            isShow: true,
            title: title,
            align: align,
            onOk: onOk,
            onCancel: onCancel,
            okText: okText,
            cancelText: cancelText,
            placeHolder: placeHolder
        },
        on: {
            'update:isShow': isShow => {
                vm.isShow = isShow;

            }
        }
    });
    return vm;
};


// ==================== 添加全局命令 ====================
// 组件内调用: this.$alert
Vue.prototype.$alert = Alert;

// 组件内调用: this.$confirm
Vue.prototype.$confirm = Confirm;

// 组件内调用: this.$prompt
Vue.prototype.$prompt = Prompt;

export {
    Alert,
    Confirm,
    Prompt
}