import Component from './SwipeOutButton';

/* istanbul ignore next */
Component.install = function(Vue) {
  Vue.component(`${Component.name.replace('Atom', 'A')}`, Component);
};

export default Component;