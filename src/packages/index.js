import Icon from './Static/Icon/Icon';
import ScrollView from './ScrollView/ScrollView';
import LayoutUpDown from './Layout/LayoutUpDown';

var Atom = {};
Atom.install = function(Vue) {
    Vue.component(LayoutUpDown.name, LayoutUpDown);
    Vue.component(ScrollView.name, ScrollView);
    Vue.component(Icon.name, Icon);
};
export default Atom;
