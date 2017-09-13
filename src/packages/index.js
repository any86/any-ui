import Toast from '@/packages/Toast/Toast';
import Loading from '@/packages/Loading/Loading';
import Icon from './Icon/Icon';
import Spinner from './Spinner/Spinner';
import ScrollView from './ScrollView/ScrollView';
import Flexbox from './Flexbox/FlexBox';
import FlexItem from './Flexbox/FlexItem';
import Badge from './Badge/Badge';
import VAlert from '@/packages/Dialog/Alert';
import VConfirm from '@/packages/Dialog/Confirm';
import VPrompt from '@/packages/Dialog/Prompt';

var Atom = {};

Atom.install = function(Vue) {
    Vue.component(Flexbox.name, Flexbox);
    Vue.component(FlexItem.name, FlexItem);
    Vue.component(ScrollView.name, ScrollView);
    Vue.component(Icon.name, Icon);
    Vue.component(Spinner.name, Spinner);
    Vue.component(Badge.name, Badge);

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
        Vue.prototype.$loading = () => {
            if (null === LoadingVM) {
                LoadingVM = createVueChild(Loading);
            }
            LoadingVM.isShow = true;
            return LoadingVM;
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
