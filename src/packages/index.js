import Toast from '@/packages/Toast/Toast';
import Loading from '@/packages/Loading/Loading';
// import ScrollView from './ScrollView/ScrollView';
import VAlert from '@/packages/Dialog/Alert';
import VConfirm from '@/packages/Dialog/Confirm';
import VPrompt from '@/packages/Dialog/Prompt';

var Atom = {};

Atom.install = function(Vue) {
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
        Vue.prototype.$alert = (content = '', options = { onOk: () => {} }) => {
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
            options = { onOk: () => {}, onCancel: () => {} }
        ) => {
            if (null === vm) {
                vm = createVueChild(VConfirm);
            }
            vm.isShow = true;
            vm.content = content;
            vm.okCallback = options.onOk;
            vm.cancellCallback = options.onCancel;
        };
    }
    // =================================================
    // ==============组件内调用: this.$prompt============
    // =================================================
    {
        let vm = null;
        Vue.prototype.$prompt = (content = '', options = {}) => {
            if (null === vm) {
                vm = createVueChild(VPrompt);
            }
            vm.isShow = true;
            vm.content = content;
            vm.okCallback = options.onOk;
            vm.cancellCallback = options.onCancel;
        };
    }
    // ========================================== mask ==================================
    Vue.prototype.$mask = (options = {}) => {
        vm.mask.show = true;
    };
    // ========================================== loading ==================================
    {
        let LoadingVM = null;
        Vue.prototype.$loading = {};
        Vue.prototype.$loading.start = Vue.prototype.$loading.open = (
            options = { afterEnter: () => {} }
        ) => {
            if (null === LoadingVM) {
                LoadingVM = createVueChild(Loading);
            }
            LoadingVM.isShow = true;
            LoadingVM.afterEnterCallback = options.afterEnter;
        };

        Vue.prototype.$loading.close = () => {
            if (null !== LoadingVM) {
                LoadingVM.isShow = false;
            }
        };
    }
    // ==========================================toast==================================
    {
        let toastVM = null;
        Vue.prototype.$toast = (text = '', options = {}) => {
            if (null === toastVM) {
                toastVM = createVueChild(Toast);
            }
            toastVM.position = options.position || 'center';
            toastVM.isShow = true;
            toastVM.text = text;
            toastVM.delay = options.delay || toastVM.delay;
            return toastVM;
        };
    }
};

export default Atom;
