import AAlert from './Dialog/Alert';
import AConfrim from './Dialog/Confirm';
import APrompt from './Dialog/Prompt';
import ALoading from './Loading/Loading';
import AToast from './Toast/Toast';

// 其他组件
import * as components from './components.js'
// 水波纹特效
import ripple from '../directives/ripple/index.js';
// 移动dom指令
import DomPortal from 'vue-dom-portal';

var Atom = {};
// var ZIndexManger = 0; // 稍后做zindex管理
Atom.install = function(Vue) {
    // 水波纹特效
    Vue.use(ripple)
    // 移动dom指令
    Vue.use(DomPortal);

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
        Vue.prototype.$alert = (content = '', options = {
            onOk: () => {}
        }) => {
            if (null === vm) {
                vm = createVueChild(AAlert);
            }
            vm.isShow = true;
            vm.content = content;
            vm.okCallback = options.onOk;
        };
    }

    // =================================================
    // ==============组件内调用: this.$confirm============
    // =================================================
    {
        let vm = null;
        Vue.prototype.$confirm = (
            content = '', {
                onOk = () => {},
                onCancel = () => {}
            } = {}
        ) => {
            if (null === vm) {
                vm = createVueChild(AConfrim);
            }
            vm.isShow = true;
            vm.content = content;
            vm.afterOk = onOk;
            vm.afterCancel = onCancel;
        };
    }
    // =================================================
    // ==============组件内调用: this.$prompt============
    // =================================================
    {
        let vm = null;
        Vue.prototype.$prompt = (
            content = '', {
                onOk = () => {},
                onCancel = () => {}
            } = {}
        ) => {
            if (null === vm) {
                vm = createVueChild(APrompt);
            }
            vm.isShow = true;
            vm.content = content;
            vm.onOk = onOk;
            vm.onCancel = onCancel;
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

    // ==========================================loading==================================
    {
        let loadingVM = null;
        Vue.prototype.$loading = () => {
            if (null === loadingVM) {
                loadingVM = createVueChild(ALoading);
            }
            loadingVM.isShow = true;
            return loadingVM;
        };

        Vue.prototype.$loading.close = () => {
            loadingVM.isShow = false;
        };
    }
};

export default Atom;