import Vue from "vue";
import Vuex from "vuex";

// actions
import actions from "./actions.js";

// mutations
import mutations from "./mutations.js";

// 模块
import cart from './modules/cart.js'

const state = {
  customer: { entity_id: '', email: '', firstname: '', lastname: '' },
  currency: 'USD',
  isShowHeader: true,
  isShowFooter: true,
  isShowSide: false,
  isShowLoading: false,
};

Vue.use(Vuex);
export default new Vuex.Store({
  state,
  actions,
  mutations,
  modules: {
    cart
  }
});