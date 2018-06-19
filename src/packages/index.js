// 常规组件
import * as components from './components.js';

// 对话框类组件
import AAlert from './Dialog/Alert';
import AConfirm from './Dialog/Confirm';
import APrompt from './Dialog/Prompt';
import AToast from './Toast';
import ALoading from './Loading';

// 水波纹特效
import ripple from '../directives/ripple/index.js';
// 手势
import finger from '../directives/touch/index.js';
// 移动dom指令
import DomPortal from 'vue-dom-portal';

// 挂载语言包
import locale from '@/locale';
let Atom = {
    finger,
    locale
};

Atom.install = function(Vue, opts = {}) {
    // 使用指定语言
    locale.use(opts.locale);

    // 水波纹特效
    Vue.use(ripple);

    // v-touch指令
    Vue.use(finger);

    // 移动dom指令
    Vue.use(DomPortal);

    // 注册组件
    for (let k in components) {
        let component = components[k];
        Vue.component(`${component.name.replace('Atom', 'A')}`, component);
    }

    let appId = 1;
    const createVueChild = component => {
        // 创建一个挂载点
        const node = document.createElement('div');
        // 起个不重复的名字
        node.id = `_app-${appId}`;
        appId++;
        // 插入到文档最后
        document.body.appendChild(node);
        // 挂载
        const VueChild = Vue.extend(component);
        return new VueChild().$mount('#' + node.id);
    };

    // =================================================
    // ==============组件内调用: this.$alert==============
    // =================================================
    {
        let vm = null;
        Vue.prototype.$alert = (content = '', {
            title = '',
            okText = locale.t('alert.ok'),
            align = 'top',
            onOk = () => {}
        } = {}) => {
            if (null === vm) vm = createVueChild(AAlert);
            vm.isShow = true;
            vm.title = title;
            vm.align = align;
            vm.content = content;
            vm.onOk = onOk;
            vm.okText = okText;
        };
    }

    // =================================================
    // ==============组件内调用: this.$confirm============
    // =================================================
    {
        let vm = null;
        Vue.prototype.$confirm = (
            content = '', {
                title = '',
                okText = locale.t('confirm.ok'),
                cancelText = locale.t('confirm.cancel'),
                align = 'bottom',
                onOk = () => {},
                onCancel = () => {}
            } = {}
        ) => {
            if (null === vm) {
                vm = createVueChild(AConfirm);
            }
            vm.isShow = true;
            vm.content = content;
            vm.okText = okText;
            vm.cancelText = cancelText;
            vm.onOk = onOk;
            vm.onCancel = onCancel;
        };
    }
    // =================================================
    // ==============组件内调用: this.$prompt============
    // =================================================
    {
        let vm = null;
        Vue.prototype.$prompt = (
            title = '', {
                onOk = () => {},
                onCancel = () => {},
                align = 'top',
                okText = locale.t('prompt.ok'),
                cancelText = locale.t('prompt.cancel'),
                placeHolder = locale.t('prompt.placeHolder')
            } = {}
        ) => {
            if (null === vm) {
                vm = createVueChild(APrompt);
            }
            vm.isShow = true;
            vm.title = title;
            vm.okText = okText;
            vm.align = 'top';
            vm.cancelText = cancelText;
            vm.onOk = onOk;
            vm.onCancel = onCancel;
            vm.placeHolder = placeHolder;
        };
    }

    // =================================================
    // ==============组件内调用: this.$toast=============
    // =================================================
    {
        let toastVM = null;
        Vue.prototype.$toast = (
            content = '', {
                type = 'default',
                position = 'center',
                delay = 3000,
                closeable = true
            } = {}
        ) => {
            if (null === toastVM) {
                toastVM = createVueChild(AToast);
            }
            toastVM.type = type;
            toastVM.position = position;
            toastVM.closeable = closeable;
            toastVM.isShow = true;
            toastVM.content = content;
            toastVM.delay = delay;
            toastVM.$on('update:isShow', isShow => {
                toastVM.isShow = isShow;
            })
            toastVM.close = () => {
                toastVM.isShow = false;
            };
            return toastVM;
        };

        Vue.prototype.$toast.close = Vue.prototype.$toast.hide = () => {
            toastVM.isShow = false;
        }
    }

    // =================================================
    // ==============组件内调用: this.$loading===========
    // =================================================
    {
        Vue.prototype.$loading = (content) => {
            Vue.prototype.$toast(content, {
                type: 'loading',
                delay: 0,
                closeable: false
            });
        }
        Vue.prototype.$loading.close = Vue.prototype.$toast.close;
    }
};

export default Atom;