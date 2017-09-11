/**
 * 购物车模块
 */
import {
    SET_CHARM_SVG,
    CLEAR_CHARM_SVG
} from '../mutation-types.js'

import Api from '@/api/';

// state
const state = {
    svg
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
            const response = await Api.getGoodsListOfCart(params);
            if (SUCCESS_CODE == response.status) {
                commit(SET_CART_LIST, response.data);
            }
            // 获取总计信息
            const totalInfo = await Api.getTotalOfCart();
            commit(SET_TOTAL_INFO, totalInfo.data);
        } catch (error) {
            console.log(error);
        }
    },

    async getTotalOfCart({ commit, state }, params) {
        try {
            // 获取总计信息
            const totalInfo = await Api.getTotalOfCart();
            commit(SET_TOTAL_INFO, totalInfo.data);
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
        } else {
            commit(SET_CART_MESSAGE, response);
        }
        return response;
    },
    /**
     * 修改商品属性, 比如数量/尺寸等
     * 
     * @param {any} { commit, state } 
     * @param {any} editInfo 
     * @returns 
     */
    async editGoodsOfCart({ commit, state }, editInfo) {
        try {
            await Api.editGoodsOfCart(editInfo);
        } catch (error) {

        }

    },
    /**
     * 删除商品从购物车
     * @param  {Number} index 当前列表索引
     * @param  {Object} e     event
     */
    async removeGoodsFromCart({ commit, state }, id) {
        try {
            const response = await Api.removeGoodsFromCart(id);
        } catch (error) {
            syslog(error);
        }
    },
    /**
     * 还原优惠券
     * @param {object} { commit, state } 
     * @param {string} code 
     */
    async restoreCoupon({ commit, state }, code) {
        try {
            const response = await Api.restoreCoupon({ code });
        } catch (error) {
            syslog(error);
        }
    },
    /**
     * 使用优惠券
     * @param {object} { commit, state } 
     * @param {string} code 
     */
    async useCoupon({ commit, state }, code) {
        try {
            const response = await Api.useCoupon({ code });
        } catch (error) {
            syslog(error);
        }
    },
};

// mutations
const mutations = {
    /**
     * 填充购物车列表
     * @param {any} state 
     * @param {any} goodsList 
     */
    [SET_CART_LIST](state, goodsList) {
        state.goodsList = goodsList;
    },
    /**
     * 设置购物车总数
     * @param {any} state 
     * @param {any} count 
     */
    [SET_CART_COUNT](state, count) {
        state.count = count;
    },
    /**
     * 添加商品到购物车
     * 
     * @param {any} state 
     * @param {any} goods 
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
     * @param {any} state 
     * @param {int} goods_id 
     */
    [REMOVE_GOODS_FROM_CART](state, goods_id) {
        state.goodsList = state.goodsList.filter(goods => {
            return goods_id != goods.id;
        });
    },

    [SET_CART_MESSAGE](state, message) {
        state.message = message;
    },

    [SET_TOTAL_INFO](state, totalInfo) {
        state.totalInfo = totalInfo;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
