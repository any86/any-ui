import DialogServer from './DialogServer'

var plugin = {};
plugin.install = (Vue, options) => {
    // Vue.component('VPrompt', Prompt);
    // document.createDocumentFragment()
    var DialogServerComponent = Vue.extend(DialogServer);
    // 创建一个挂载点
    var node = document.createElement('div');
    // 起个不重复的名字
    node.id = '_app-dialog-' + Math.ceil(Math.random());
    document.body.appendChild(node);
    // 挂载
    var vm = new DialogServerComponent().$mount('#' + node.id);
    // =================================================
    // ==============组件内调用: this.$alert==============
    // =================================================
    Vue.prototype.$alert = (text = '', options = {}) => {
        return new Promise((resolve, reject) => {
            vm.modal.show = true;
            vm.alert = {
                ...vm.alert,
                ...options,
                ok: () => {
                    vm.modal.show = false;
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
            vm.modal.show = true;
            vm.confirm = {
                ...vm.alert,
                ...options,
                ok: () => {
                    vm.modal.show = false;
                    resolve();
                },
                cancel: () => {
                    vm.modal.show = false;
                    reject();
                },
                show: true,
                text
            };

        });
    };
}

export default plugin;
