export const upload = {
    inserted(el, binding) {

    },

    componentUpdated(el, binding) {},

    unbind(el) {}
};

const plugin = {
    install(Vue) {
        Vue.directive('upload', upload);
    }
};

export default plugin;
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}