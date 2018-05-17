import Touch2 from '../../utils/touch2';

const plugin = {
    install(Vue) {
        // 存储Touch2实例
        let _manages = []; // {el, instance}

        // 支持的事件
        const SPPORT_ENENTS = [
            'doubletap',
            'touchstart',
            'touchmove',
            'touchend',
            'touchcancel',
            'tap',
            'swipe',
            'swipeleft',
            'swiperight',
            'swipeup',
            'swipedown',
            'pinch',
            'pinchstart',
            'pinchmove',
            'pinchend',
            'rotate',
            'rotatestart',
            'rotatemove',
            'rotateend',
            'pan',
            'panstart',
            'panmove',
            'panend',
            'press',
            'pressup'
        ];

        /**
         * 获取元素在_manages中的索引
         * @param {Element} 元素 
         */
        const _getManageIndex = (el) => {
            for (let i = 0, len = _manages.length; i < len; i++) {
                if (el === _manages[i].el) {
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
            if (-1 === SPPORT_ENENTS.indexOf(binding.arg)) {
                console.warn(`不支持${binding.arg}事件!`);
                return;
            }
            const manage_index = _getManageIndex(el);
            let instance;
            if (-1 === manage_index) {
                // 新建实例
                instance = new Touch2(el);
                _manages.push({
                    instance,
                    el
                });
            } else {
                instance = _manages[manage_index].instance;
            }

            // 绑定事件
            instance.on(binding.arg, (data, e) => {
                binding.modifiers.stop && e.stopPropagation();
                binding.modifiers.prevent && e.preventDefault();
                if (binding.modifiers.self && el !== e.target) return;
                binding.value(data, e);
            });
        };

        /**
         * 解除绑定事件
         * @param {Element} 关联元素 
         */
        const _unbindEvent = (el) => {
            const manage_index = _getManageIndex(el);
            // 防止一个元素上的多个手势指令会重复触发删除
            if (-1 !== manage_index && undefined !== _manages[manage_index]) {
                _manages[manage_index].instance.destory();
                _manages.splice(manage_index, 1);
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