import Vue from 'vue';
import Finger from '../../utils/finger.js';
const plugin = {
    install(Vue) {
        Vue.directive('finger', {
            inserted(el, binding) {
                
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