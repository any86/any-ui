import AToast from './Toast';
// 创建子类方法
import createApp from '@/utils/createApp';
import Vue from 'vue';

let vm;
/**
 * Alert
 * @param {Object}} 内容 
 * @param {Object} 其他参数 
 */
const Toast = (content, {
    type = 'default',
    position = 'center',
    delay = 3000,
    closeable = true
} = {}) => {
    vm = createApp(Vue, AToast);
    vm.type = type;
    vm.position = position;
    vm.closeable = closeable;
    vm.content = content;
    vm.delay = delay;
    // 防止2次isShow的改变被合并成一次, 防止watch会失效
    vm.$nextTick(() => {
        vm.isShow = true;
    });
    // 监听
    vm.$on('update:isShow', isShow => {
        vm.isShow = isShow;
    });

    // 关闭
    vm.close = () => {
        vm.isShow = false;
    };

    return vm;
};

Toast.close = () => {
    Vue.nextTick(() => {
        vm.isShow = false;
    });
}

export default Toast;