import ADialog from './Dialog';
export default ADialog;

import Vue from 'vue';
import AlertCom from './Alert.vue';
import DomPortal from 'vue-dom-portal';
Vue.use(DomPortal);
export function Alert() {
    // 创建一个挂载点
    const node = document.createElement('div');
    // 起个不重复的名字
    node.id = '_app-dialog--alert';
    // 插入到文档最后
    document.body.appendChild(node);
    // 挂载
    const VueChild = Vue.extend(AlertCom);
    let vm = new VueChild().$mount('#_app-dialog--alert');
    vm.isShow = true;
    vm.content = 'i am alert!';
}