import * as types from '@/store/mutation-types';


export default {
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
