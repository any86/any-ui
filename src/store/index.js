import Vue from "vue";
import Vuex from "vuex";

// actions
import actions from "./actions.js";
// mutations
import mutations from "./mutations.js";

// 模块
// import goodsModule from './modules/goods.js'
const state = {
	currency: '',
    isShowHeader: true,
    isShowFooter: true,
    isShowSideBar: false
};

Vue.use(Vuex);
export default new Vuex.Store({
    state,
    actions,
    mutations
    // modules: {
    //     goodsModule
    // }
});
