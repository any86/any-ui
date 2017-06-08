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
  }
};
