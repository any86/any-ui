import VAlert from './Dialog/Alert';
import VConfirm from './Dialog/Confirm';
import VPrompt from './Dialog/Prompt';
import VLoading from './Loading/Loading';
import * as components from './components.js'
const {
    VAffix,
    VBadge,
    VBreadcrumb,
    VButton,
    VButtonGroup,
    VCarousel,
    VCarouselItem,
    VCell,
    VCheckbox,
    VCollapse,
    VCount,
    VDialog,
    VDivider,
    VDrawer,
    VGroup,
    VHeaderBar,
    VInput,
    VLazyLoad,
    VMask,
    VPicker,
    VPopper,
    VPopup,
    VPopupPicker,
    VLine,
    VCircle,
    VQRCode,
    VRadio,
    VRange,
    VRate,
    VScrollView,
    VSegment,
    VSteps,
    VSwitch,
    VTabs,
    VTag,
    VTextarea,
    VToast,
    VVirtualScroller,
    VWarning,
    VAndroid,
    VThreeDots,
    VRipple
} = components;

var Atom = {};
var ZIndexManger = 0; // 稍后做zindex管理
Atom.install = function(Vue) {

    // for(let k in components) {
    //     let component = components[k];
    //     // console.log(component.toLocaleLowerCase());
    //     // Vue.component(component.name.toLocaleLowerCase(), component);
    // }

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
        Vue.prototype.$alert = (content = '', options = {
            onOk: () => {}
        }) => {
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
            content = '', {
                ok = () => {},
                cancel = () => {}
            } = {}
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
            content = '', {
                onOk = () => {},
                onCancel = () => {}
            } = {}
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
        let timeout = null;
        Vue.prototype.$toast = (
            text = '', {
                position = 'center',
                delay = 0
            } = {}
        ) => {
            if (null === toastVM) {
                toastVM = createVueChild(VToast);
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
                loadingVM = createVueChild(VLoading);
                loadingVM.isShow = true;
                return loadingVM;
            }
        };

        Vue.prototype.$loading.close = () => {
            loadingVM.isShow = false;
        };
    }
};

export default Atom;