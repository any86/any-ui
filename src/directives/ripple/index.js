import Vue from 'vue';
// import { touchStartHandler, touchendHandler } from './ripple.js';
import Ripple from '@/utils/ripple/src/ripple.js';
const plugin = {
    install(Vue) {
        Vue.directive('ripple', {
            inserted(el, binding) {
                new Ripple(el);
                // // 绑定事件
                // el.addEventListener('touchstart', touchStartHandler);
                // el.addEventListener('touchend', touchendHandler);
            },

            // updated(el, binding) {

            // },

            componentUpdated(el, binding) {
                // updateRipple(el, binding);
            },

            unbind(el) {
                // el.removeEventListener('touchstart', touchStartHandler);
                // el.removeEventListener('touchend', touchendHandler);
            }
        });
    }
};
export default plugin;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}
