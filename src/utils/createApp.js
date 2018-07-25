let instances = {};
/**
 * 用指定组件创建一个vue实例
 * @param {Object} Vue构造函数
 * @param {Object} 组件对象 
 */
export default function(Vue, component) {
    const id = `_app-${component.name}`;
    // if(undefined !== instances[id]){
    //     instances[id].$destroy();
    //     delete instances[id];
    // } 
    // 创建一个挂载点
    const node = document.createElement('div');
    node.id = id;
    // 插入到文档最后
    document.body.appendChild(node);
    // 创建子类
    const VueSubClass = Vue.extend(component);
    // 挂载
    let vm = new VueSubClass().$mount(`#${node.id}`);
    instances[id] = vm;
    return vm;
};