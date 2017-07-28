import axios from 'axios';

const getCartPage = params => axios.get('./static/cart.json', { params });

const getZone = (level, params) => axios.get('./mock/zone' + (parseInt(level)), { params });

const saveAddress = params => axios.post('./mock/success', params);

const getGoodsList = params => axios.get('/api/rest/catalog/product?___store=default&category=7', { params });
// const getGoodsList = params => axios.get('./static/imgs.json', { params });
const getGoodsListBySku = params => axios.get('/api/rest/catalog/product', { params });
// 登录页
const login = params => axios.post('/oauth/login', params);
// 首页
const getIndexPage = params => axios.get('./static/index.json', { params });
// 列表页
const getListPage = params => axios.get('./static/list.json', { params });
// 购物车相关
const getCartGoodsList = params => axios.get('./static/cartGoodsList.json', { params });
const getCartRecommend = params => axios.get('./static/cartRecommend.json', { params });
const getCartGiftList = params => axios.get('./static/cartGoodsList.json', { params });

const addGoodsToCart = params => axios.get('./static/success.json', { params });


export default {
  getGoodsList,
  getCartPage,
  getZone,
  saveAddress,
  getGoodsListBySku,
  login,
  getIndexPage,
  getListPage,
  getCartGoodsList,getCartRecommend,addGoodsToCart
};
