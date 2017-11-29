import Vue from 'vue';
import { touchStartHandler, touchendHandler } from './ripple.js'


Vue.directive('ripple', {
    bind() {
        // bind中还没有插入元素, 所以没法获取尺寸
    },

    inserted(el, binding) {
        // 默认值
        let duration = 1000;
        let background = 'rgba(0,0,0,0.2)';
        let timer = null;
        const opts = !binding.value ? { disabled: true } : binding.value;
        if (undefined !== opts.background) background = opts.background;
        if (undefined !== opts.duration) duration = opts.duration;

        el.addEventListener('touchstart', event => {
            touchStartHandler(el, { background, duration }, event);
        });
        

        el.addEventListener('touchend', event => {
            touchendHandler(el, timer, {duration}, event);
        });
        
    },

    update(el, binding) {
    },

    unbind(el) {
    }
});
