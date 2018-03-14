import Finger from '../../utils/finger.js';
let _cache = [];
const plugin = {
    install(Vue) {
        Vue.directive('touch', {
            inserted(el, binding) {
                console.log(binding.arg);
                new Finger(el, {});
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