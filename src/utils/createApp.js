let instances = {};
/**
 * 用指定组件创建一个vue实例
 * @param {Object} Vue构造函数
 * @param {Object} 组件对象 
 */
export default function(Vue, component, {
    props = {},
    on = {},
    isSingle = true
} = {}) {
    const id = `_app-${component.name}`;
    if (!isSingle || undefined === instances[id]) {
        // 创建一个挂载点
        const node = document.createElement('div');
        node.id = id;
        // 插入到文档最后
        document.body.appendChild(node);
        // 创建子类
        const VueSubClass = Vue.extend(component);
        // 创建实例
        let vm = new VueSubClass();
        // 传入初始化值
        for (let key in props) vm[key] = props[key];
        // 挂载
        vm.$mount(`#${node.id}`);
        instances[id] = vm;
        return vm;
    } else {
        let vm = instances[id];
        for (let key in props) vm[key] = props[key];
        return vm;
    }
};