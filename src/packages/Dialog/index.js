import DialogRoot from './DialogRoot'

var plugin = {};
plugin.install = (Vue, options) => {
    // Vue.component('VPrompt', Prompt);
    // document.createDocumentFragment()
    var DialogRootComponent = Vue.extend(DialogRoot);
    // 创建一个挂载点
    var node = document.createElement('div');
    // 起个不重复的名字
    node.id = '_app-dialog-' + Math.ceil(Math.random());
    document.body.appendChild(node);
    // 挂载
    var vm = new DialogRootComponent().$mount('#' + node.id);
    // =================================================
    // ==============组件内调用: this.$alert==============
    // =================================================
    Vue.prototype.$alert = (text = '', options = {}) => {
        return new Promise((resolve, reject) => {
            vm.mask.show = true;
            vm.alert = {
                ...vm.alert,
                ...options,
                ok: () => {
                    vm.mask.show = false;
                    resolve();
                },
                show: true,
                text

            };
        });
    };
    // =================================================
    // ==============组件内调用: this.$confirm============
    // =================================================
    Vue.prototype.$confirm = (text = '', options = {}) => {
        return new Promise((resolve, reject) => {
            vm.mask.show = true;
            vm.confirm = {
                ...vm.alert,
                ...options,
                ok: () => {
                    vm.mask.show = false;
                    resolve();
                },
                cancel: () => {
                    vm.mask.show = false;
                    reject();
                },
                show: true,
                text
            };

        });
    };
}

export default plugin;
