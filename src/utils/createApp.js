/**
 * 用指定组件创建一个vue实例
 * @param {Object} Vue构造函数
 * @param {Object} 组件对象 
 */
export default function(Vue, component) {
    // 创建一个挂载点
    const node = document.createElement('div');
    node.id = `_app-${component.name}`;
    // 插入到文档最后
    document.body.appendChild(node);
    // 创建子类
    const VueSubClass = Vue.extend(component);
    // 挂载
    return new VueSubClass().$mount(`#${node.id}`);
};