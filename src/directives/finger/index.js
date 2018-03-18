import Finger from '../../utils/finger.js';

const plugin = {
    install(Vue) {
        // 存储finger实例
        let _manger = []; // {el, instance}

        // 支持的事件
        const SPPORT_ENENTS = [
            'touchstart', 
            'touchmove', 
            'touchend', 
            'touchcancel', 
            'tap',
            'double-tap',
            'swipe',
            'pinch',
            'rotate',
            'pan',
            'press'
        ];

        /**
         * 获取元素在_manger中的索引
         * @param {Element} 元素 
         */
        const _getInstanceIndex = (el) => {
            for (let i = 0, len = _manger.length; i < len; i++) {
                if (el === _manger[i].el) {
                    return i;
                }
            }
            return -1;
        };

        /**
         * 绑定事件
         * @param {Element} 关联元素 
         * @param {Object} 指令对应的binding
         */
        const _bindEvent = (el, binding) => {
            if(-1 === SPPORT_ENENTS.indexOf(binding.arg)) {
                console.warning(`不支持${binding.arg}事件!`);
                return;
            }
            const instance_index = _getInstanceIndex(el);
            let instance;
            if (-1 === instance_index) {
                // 新建实例
                instance = new Finger(el, {});
                _manger.push({ instance, el });
            } else {
                instance = _manger[instance_index].instance;
            }

            // 绑定事件
            instance.on(binding.arg, binding.value);
        };

        /**
         * 解除绑定事件
         * @param {Element} 关联元素 
         */
        const _unbindEvent = (el) => {
            const instance_index = _getInstanceIndex(el);
            // 防止一个元素上的多个手势指令会重复触发删除
            if(-1 !== instance_index && undefined !== _manger[instance_index]) {
                _manger[instance_index].instance.destory();
                _manger.splice(instance_index, 1);
            }
        };

        Vue.directive('touch', {
            inserted(el, binding) {
                _bindEvent(el, binding);
            },

            update(el, binding) {
                _bindEvent(el, binding);
            },

            unbind(el) {
                _unbindEvent(el);
            }
        });
    }
};
export default plugin;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}