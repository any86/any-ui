import axios from 'axios';

const getGoodsList = params => axios.get('./mock/imgs', { params });

const getBagPage = params => axios.get('./static/bag.json', { params });

const getZone = (level, params) => axios.get('./mock/zone' + (parseInt(level)), { params });

const saveAddress = params => axios.post('./mock/success', params);

export default {
    getGoodsList,
    getBagPage,
    getZone,saveAddress
};
