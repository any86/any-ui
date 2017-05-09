import Icon from './Icon/Icon';
import ScrollView from './ScrollView/ScrollView';
import Flexbox from './Flexbox/FlexBox';
import FlexItem from './Flexbox/FlexItem';


var Atom = {};
Atom.install = function(Vue) {
    Vue.component(Flexbox.name, Flexbox);
    Vue.component(FlexItem.name, FlexItem);
    Vue.component(ScrollView.name, ScrollView);
    Vue.component(Icon.name, Icon);
};
export default Atom;
