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

    [types.SHOW_SIDE_BAR](state) {
        state.isShowSideBar = true;
    },

    [types.HIDE_SIDE_BAR](state) {
        state.isShowSideBar = false;
    },

    [types.SET_CURRENCY](state, currency) {
        state.currency = currency;
    },

    [types.SET_LANGUAGE](state, language) {
        state.language = language;
    }
};
