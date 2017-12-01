import Vue from 'vue';
import { touchStartHandler, touchendHandler } from './ripple.js';
const updateRipple = (el, binding) => {
    // 默认值
    let opts = {
        duration: 1000,
        opacity: 0.2,
        disabled: false
    };
    // 合并参数
    // 支持Boolean/Undefined/Object
    if (false === binding.value) {
        opts = { ...opts, disabled: true };
    } else if ('[object Object]' === Object.prototype.toString.call(binding.value)) {
        opts = { ...opts, ...binding.value }
    }

    // opts存储到dataset
    if (undefined !== opts.background) el.dataset.rippleBackground = opts.background;
    el.dataset.rippleDuration = undefined === opts.duration ? duration : opts.duration;
    el.dataset.rippleOpacity = opts.opacity;
    el.dataset.rippleDisabled = opts.disabled;
    el.dataset.rippleTimer = el.dataset.rippleTimer || null;
}
export default {
    // bind(el) {
    //     // bind中还没有插入元素, 所以没法获取尺寸
    // },

    inserted(el, binding) {
        updateRipple(el, binding);
        // 绑定事件
        el.addEventListener('touchstart', touchStartHandler);
        el.addEventListener('touchend', touchendHandler);
    },

    // updated(el, binding) {

    // },

    componentUpdated(el, binding) {
        // log(binding.value, binding.oldValue)
        updateRipple(el, binding);
    },

    unbind(el) {
        el.removeEventListener('touchstart', touchStartHandler);
        el.removeEventListener('touchend', touchendHandler);
    }
};
