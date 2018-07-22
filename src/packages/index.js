// 常规组件
import * as components from './components.js';

// 对话框类组件
import { Alert, Confirm, Prompt } from '../packages/Dialog/index.js'
import AToast from './Toast';

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

import { setConfigs } from './config';
Atom.install = function (Vue, opts = {}) {
    // 使用指定语言
    locale.use(opts.locale);

    // 存储config
    setConfigs(opts);

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
    Vue.prototype.$alert = Alert;
    // =================================================
    // ==============组件内调用: this.$confirm============
    // =================================================
    Vue.prototype.$confirm = Confirm;
    // =================================================
    // ==============组件内调用: this.$prompt============
    // =================================================
    Vue.prototype.$prompt = Prompt;

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

            toastVM.content = content;
            toastVM.delay = delay;

            // 防止2次isShow的改变被合并成一次, 防止watch会失效
            toastVM.$nextTick(() => {
                toastVM.isShow = true;
            });

            // 监听
            toastVM.$on('update:isShow', isShow => {
                toastVM.isShow = isShow;
            });

            // 关闭
            toastVM.close = () => {
                toastVM.isShow = false;
            };
            return toastVM;
        };

        Vue.prototype.$toast.close = Vue.prototype.$toast.hide = () => {
            Vue.nextTick(() => {
                toastVM.isShow = false;
            });
        }
    }

    // =================================================
    // ==============组件内调用: this.$loading===========
    // =================================================
    {
        Vue.prototype.$loading = (content = '') => {
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