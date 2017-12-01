import Vue from 'vue';
import { touchStartHandler, touchendHandler } from './ripple.js';
const updateRipple = (el, binding) => {
    // 默认值
    const duration = 1000;
    const background = 'rgba(0,0,0,1)';
    let opts = {};
    if (undefined === binding.value) {
        opts = { disabled: false };
    } else if (false === binding.value) {
        opts = { disabled: true };
    } else if (true === binding.value) {
        opts = { disabled: false };
    } else {
        opts = binding.value;
    }
    // opts存储到dataset
    el.dataset.rippleDuration = undefined === opts.duration ? duration : opts.duration;
    el.dataset.rippleBackground = undefined === opts.background ? background : opts.background;
    el.dataset.rippleDisabled = opts.disabled;
    el.dataset.rippleTimer = el.dataset.rippleTimer || null;
}
export default {
    bind(el) {
        // bind中还没有插入元素, 所以没法获取尺寸
    },

    inserted(el, binding) {
        updateRipple(el, binding);
        // 绑定事件
        el.addEventListener('touchstart', touchStartHandler);
        el.addEventListener('touchend', touchendHandler);
    },

    // updated(el, binding) {
    //     updateRipple(el, binding);
    // },

    componentUpdated(el, binding){
        // log(binding.value, binding.oldValue)
        updateRipple(el, binding);
    },

    unbind(el) {
        el.removeEventListener('touchstart', touchStartHandler);
        el.removeEventListener('touchend', touchendHandler);
    }
};
