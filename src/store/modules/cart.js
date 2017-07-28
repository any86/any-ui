import {
  SET_CART_LIST,
  SET_CART_COUNT,
  ADD_GOODS_TO_CART,
  REMOVE_GOODS_FROM_CART,
  SET_CART_STATUS,
} from '../mutation-types.js'
import Api from '../../api/';

// state
const state = {
  status: -1,
  goodsList: []
};

// getters
const getters = {
  count: state => state.goodsList.length
}

// actions
const actions = {
  getGoodsListOfCart({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      Api.getCartGoodsList({ params })
        .then(response => {
          if (200 == response.status) {
            commit(SET_CART_LIST, response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  addGoodsToCart({ commit, state }, goods) {
    return new Promise((resolve, reject) => {
      Api.addGoodsToCart({ id: goods.id })
        .then(response => {
          commit(ADD_GOODS_TO_CART, goods);
          resolve(goods);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

// mutations
const mutations = {
  /**
   * 获取购物车商品列表
   */
  [SET_CART_LIST](state, goodsList) {
    state.goodsList = goodsList;
  },

  [SET_CART_COUNT](state, count) {
    state.count = count;
  },
  /*
   * 添加商品到购物车
   */
  [ADD_GOODS_TO_CART](state, goods) {
    var isExits = false;
    for (var goodsInCart of state.goodsList) {
      if (goods.id == goodsInCart.id) {
        goods.count++;
        isExits = true;
        break;
      }
    }
    // 不存在购物车中, 加入购物车
    if (!isExits) {
      goods.count = 1;
      state.goodsList.push(goods);
    }
  },
  /**
   * 删除购物车指定id商品
   */
  [REMOVE_GOODS_FROM_CART](state, goods_id) {
    state.goodsList = state.goodsList.filter(goods => {
      return goods_id != goods.id;
    });
  },

  [SET_CART_STATUS](state, code) {
    state.status = code;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
