import * as types from "./mutation-types";

export default {
    [types.INIT_GOODS_LIST](state, list) {
        state.list = list;
    },

    [types.APPEND_TO_GOODS_LIST](state, list) {
        state.list.push(...list);
    },

    [types.PREPEND_TO_GOODS_LIST](state, list) {
        state.list.splice(0, 0, ...list);
    },

    [types.SHOW_SIDE](state) {
        state.isShowSide = true;
    },

    [types.HIDE_SIDE](state) {
        state.isShowSide = false;
    },

    [types.SHOW_LOADING](state) {
        state.isShowLoading = true;
    },

    [types.HIDE_LOADING](state) {
        state.isShowLoading = false;
    },

    [types.SET_CURRENCY](state, currency) {
        state.currency = currency;
    },

    [types.SET_LANGUAGE](state, language) {
        state.language = language;
    },

    [types.SET_CUSTOMER](state, customer) {
        state.customer = customer;
    }
};
