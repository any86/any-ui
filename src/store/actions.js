import Api from '../api/';
import * as type from './mutation-types';
var getGoodsListOfCart = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    Api.getCartGoodsList({ params })
      .then(response => {
        commit(type.SET_CART_LIST, response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  getGoodsListOfCart
};
