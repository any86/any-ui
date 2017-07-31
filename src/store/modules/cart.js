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
    cartGoodsCount: state => state.goodsList.length
}

// actions
const actions = {
    /**
     * 购物车商品列表
     * @param {any} { commit, state } 
     * @param {any} params 
     */
    async getGoodsListOfCart({ commit, state }, params) {
        try {
            const response = await Api.getGoodsListOfCart();
            if (SUCCESS_CODE == response.status) {
                commit(SET_CART_LIST, response.data);
            }
        } catch (error) {
            console.log(error);
        }
    },
    /**
     * 添加商品到购物车
     * @param {any} { commit, state } 
     * @param {any} goods 
     */
    async addGoodsToCart({ commit, state }, goods) {
        const response = await Api.addGoodsToCart(goods);
        if (SUCCESS_CODE == response.status) {
            commit(ADD_GOODS_TO_CART, goods);
        }
    },
    /**
     * 修改商品属性, 比如数量/尺寸等
     * 
     * @param {any} { commit, state } 
     * @param {any} editInfo 
     * @returns 
     */
    async editGoodsOfCart({ commit, state }, editInfo) {
        const response = await Api.editGoodsOfCart(editInfo);
    },
    /**
     * 开始拖拽
     * @param  {Number} index 当前列表索引
     * @param  {Object} e     event
     */
    removeGoodsFromCart({ commit, state }, id) {
        return new Promise((resolve, reject) => {
            Api.removeGoodsFromCart(id)
                .then(response => {
                    commit(REMOVE_GOODS_FROM_CART, id);
                    resolve(id);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    /**
     * 使用优惠券
     * @param {object} { commit, state } 
     * @param {string} code 
     */
    useCoupon({ commit, state }, code) {
        return new Promise((resolve, reject) => {
            Api.useCoupon({ code })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    /**
     * 获取购物车小计
     * @param {object} { commit, state } 
     */
    getTotalOfCart({ commit, state }) {
        return new Promise((resolve, reject) => {
            Api.getTotalOfCart()
                .then(response => {
                    if (SUCCESS_CODE == response.status) {
                        resolve(response);
                    }
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

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
