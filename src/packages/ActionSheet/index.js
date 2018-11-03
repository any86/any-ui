import AActionSheet from './ActionSheet.vue';

import Vue from 'vue';
// 创建子类方法
import createApp from '@/utils/createApp'

/**
 * ActionSheet
 * @param {Object}} 内容 
 * @param {Object} 其他参数 
 */
const ActionSheet = ({
    title = '',
    cancelText =  'cancel',
    dataSource = [],
    onClickBtn=()=>{}
} = {}) => {
    let vm = createApp(Vue, AActionSheet, {
        props: {
            title,
            dataSource,
            cancelText
        },
    });
    // 让isShow发生变化
    vm.isShow = true;

    vm.$on('update:isShow', isShow => {
        vm.isShow = isShow;
    });

    vm.$on('click-btn', (index) => {
        onClickBtn(index, dataSource[index]);
        vm.closePanel();
    });

    // 销毁实例
    ActionSheet.destory = () => {
        vm.$destory();
    };

    return vm;
};

// ==================== 添加全局命令 ====================
// 组件内调用: this.$alert
Vue.prototype.$actionSheet = Vue.prototype.$action = ActionSheet;
export default ActionSheet;