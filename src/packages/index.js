import Toast from '@/packages/Toast/Toast';
import VLoading from '@/packages/Loading/Loading';
import VAlert from '@/packages/Dialog/Alert';
import VConfirm from '@/packages/Dialog/Confirm';
import VPrompt from '@/packages/Dialog/Prompt';

var Atom = {};
var ZIndexManger = 0; // 稍后做zindex管理
Atom.install = function (Vue) {
    // Vue.component(ScrollView.name, ScrollView);
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
        Vue.prototype.$alert = (content = '', options = { onOk: () => { } }) => {
            if (null === vm) {
                vm = createVueChild(VAlert);
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
            content = '',
            { ok = () => { }, cancel = () => { } } = {}
        ) => {
            if (null === vm) {
                vm = createVueChild(VConfirm);
            }
            vm.isShow = true;
            vm.content = content;
            vm.afterOk = ok;
            vm.afterCancel = cancel;
        };
    }
    // =================================================
    // ==============组件内调用: this.$prompt============
    // =================================================
    {
        let vm = null;
        Vue.prototype.$prompt = (
            content = '',
            { onOk = () => { }, onCancel = () => { } } = {}
        ) => {
            if (null === vm) {
                vm = createVueChild(VPrompt);
            }
            vm.isShow = true;
            vm.content = content;
            vm.onOk = onOk;
            vm.onCancel = onCancel;
        };
    }

    // ==========================================toast==================================
    {
        let toastVM = null;
        Vue.prototype.$toast = (
            text = '',
            { position = 'center', delay = 0 } = {}
        ) => {
            if (null === toastVM) {
                toastVM = createVueChild(Toast);
            }
            toastVM.position = position;
            toastVM.isShow = true;
            toastVM.text = text;
            toastVM.delay = delay;
            if (0 < delay) {
                setTimeout(() => {
                    toastVM.isShow = false;
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
                loadingVM = createVueChild(VLoading);
                loadingVM.isShow = true;
                return loadingVM;
            }
        };

        Vue.prototype.$loading.close = ()=>{
            loadingVM.isShow = false;
        };
    }
};

export default Atom;
