import Pinch from './pinch'
const plugin = {
    install(Vue) {
        Vue.directive('finger', {
            inserted(el, binding) {
                const pinch = new Pinch();
                pinch.bind(el);
            },

            // updated(el, binding) {

            // },

            componentUpdated(el, binding) {
            },

            unbind(el) {
                el.removeEventListener('touchend', touchendHandler);
            }
        });
    }
};
export default plugin;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}