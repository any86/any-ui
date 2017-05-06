import Alert from './Alert/Alert';
import Confirm from './Confirm/Confirm';

var Atom = {};
Atom.install = function(Vue) {
  Vue.component(Alert.name, Alert);
  Vue.component(Confirm.name, Confirm);
};

export default Atom;
