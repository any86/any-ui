import Vue from 'vue';
import { touchStartHandler, touchendHandler } from './ripple.js';
const updateRipple = (el, binding) => {
    // 默认值
    let opts = {
        duration: 1000,
        opacity: 0.2,
        disabled: false,
        stop: false,
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
    el.dataset.rippleStop = opts.stop;
    el.dataset.rippleOpacity = opts.opacity;
    el.dataset.rippleDisabled = opts.disabled;
    el.dataset.rippleTimer = el.dataset.rippleTimer || null;
}


const plugin = {
    install(Vue) {
        Vue.directive('ripple', {
            inserted(el, binding) {
                updateRipple(el, binding);
                // 绑定事件
                el.addEventListener('touchstart', touchStartHandler);
                el.addEventListener('touchend', touchendHandler);
            },

            // updated(el, binding) {

            // },

            componentUpdated(el, binding) {
                updateRipple(el, binding);
            },

            unbind(el) {
                el.removeEventListener('touchstart', touchStartHandler);
                el.removeEventListener('touchend', touchendHandler);
            }
        });
    }
};
export default plugin;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}
