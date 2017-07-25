import axios from 'axios';

const getBagPage = params => axios.get('./static/bag.json', { params });

const getZone = (level, params) => axios.get('./mock/zone' + (parseInt(level)), { params });

const saveAddress = params => axios.post('./mock/success', params);

const getGoodsList = params => axios.get('/api/catalog/product?___store=default&category=7', { params });
// const getGoodsList = params => axios.get('./static/imgs.json', { params });
const getGoodsListBySku = params => axios.get('/api/catalog/product', { params });

const login = params => axios.post('/oauth/login', params);

const getIndexPage = params => axios.get('./static/index.json', { params });

const getListPage = params => axios.get('./static/list.json', { params });

export default {
  getGoodsList,
  getBagPage,
  getZone,
  saveAddress,
  getGoodsListBySku,
  login,
  getIndexPage,
  getListPage
};
