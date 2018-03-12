// import Vue from 'vue';
import './ripple.scss';
import touchStart from './module/touchStart.js';
import touchMove from './module/touchMove.js';
import touchEnd from './module/touchEnd.js';
import defaultConfig from './module/config.js';

/**
 * 
 * @param {Element} el 
 * @param {Object} binding 
 */
const runRipple = (el, binding) => {
    // 默认参数
    const {
        cssNameSpace,
        background,
        duration,
        zIndex,
        isDisabled
    } = defaultConfig;
    const bindingValue = binding.value || {};

    el.dataset.rippleBackground = bindingValue.background || background;
    el.dataset.rippleDuration = bindingValue.duration || duration;
    el.dataset.rippleIsDisabled = (false === bindingValue || bindingValue.isDisabled);
    el.dataset.rippleCssNameSpace = bindingValue.cssNameSpace || cssNameSpace;

    // 绑定事件
    el.addEventListener('touchstart', touchStart);
    el.addEventListener('touchmove', touchMove);
    el.addEventListener('touchend', touchEnd);
};

const plugin = {
    install(Vue) {
        Vue.directive('ripple', {
            inserted(el, binding) {
                runRipple(el, binding);
            },

            componentUpdated(el, binding) {
                runRipple(el, binding);
            },

            unbind(el) {
                el.removeEventListener('touchstart', touchStart);
                el.removeEventListener('touchmove', touchMove);
                el.removeEventListener('touchend', touchEnd);
            }
        });
    }
};
export default plugin;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}