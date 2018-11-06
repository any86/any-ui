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
    cancelText = 'cancel',
    dataSource = [],
    onClickAction = () => {}
} = {}) => {
    let vm = createApp(Vue, AActionSheet, {
        props: {
            title,
            dataSource,
            cancelText
        },

        on: {
            'click-action': (index) => {
                onClickAction(index, dataSource[index]);
                vm.closePanel();
            },

            'update:isShow': isShow => {
                vm.isShow = isShow;
            }
        }
    });
    // 让isShow发生变化
    vm.isShow = true;

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