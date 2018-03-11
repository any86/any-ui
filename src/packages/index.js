// 所有组件
import * as components from './components.js'

// 对话框类组件
const {
    AAlert,
    AConfirm,
    APrompt,
    ALoading,
    AToast,
    APopper
} = components;


// 水波纹特效
import ripple from 'atom-ripple';
import 'atom-ripple/src/ripple.scss'

// 移动dom指令
import DomPortal from 'vue-dom-portal';


// 默认语言为中文
import locale from '../locale/lang/zh-CN';

let Atom = {};
Atom.install = function(Vue, {
    locale
}) {
    // 水波纹特效
    Vue.use(ripple);

    // 移动dom指令
    Vue.use(DomPortal);

    // 挂在语言包
    Vue.prototype.$_locale = locale;

    // 注册组件
    for (let k in components) {
        let component = components[k];
        Vue.component(`${component.name.replace('Atom', 'A')}`, component);
    }

    const createVueChild = component => {
        // 创建一个挂载点
        const node = document.createElement('div');
        // 起个不重复的名字
        node.id = `_root-app-${component.name}-${Math.random()
            .toString(36)
            .substr(2, 10)}`;
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
            okText = locale.alert.ok,
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
                okText = locale.confirm.ok,
                cancelText = locale.confirm.cancel,
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
                okText = locale.prompt.ok,
                cancelText = locale.prompt.cancel,
                placeHolder = locale.prompt.placeHolder
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
        let timeout = null;
        Vue.prototype.$toast = (
            text = '', {
                position = 'center',
                delay = 0
            } = {}
        ) => {
            if (null === toastVM) {
                toastVM = createVueChild(AToast);
            }
            toastVM.position = position;
            toastVM.isShow = true;
            toastVM.text = text;
            toastVM.delay = delay;
            if (0 < delay) {
                timeout = setTimeout(() => {
                    toastVM.isShow = false;
                    this.timeout = null;
                }, delay);
            }
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
        let loadingVM = null;
        Vue.prototype.$loading = ({
            background = 'rgba(0,0,0,0)',
            zIndex = 1986
        } = {}) => {
            if (null === loadingVM) {
                loadingVM = createVueChild(ALoading);
            }
            loadingVM.isShow = true;
            loadingVM.background = background;
            loadingVM.zIndex = zIndex;
            return loadingVM;
        };

        Vue.prototype.$loading.close = () => {
            loadingVM.isShow = false;
        };
    }
};

export default Atom;