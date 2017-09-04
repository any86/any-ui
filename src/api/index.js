import store from "@/store";
import Axios from "axios";
const axios = Axios.create({
    headers: {
        "api-store": "default",
        "api-cache": 1,
    }
});

// 拦截request
axios.interceptors.request.use(
    function(config) {
        config.headers = {
            ...config.headers,
            ...{
                "api-currency": store.state.currency
            }
        };
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);
const getFont = params => axios.get("./static/font.json", { params });

// 首页
const getIndexPage = params => axios.get("./static/index.json", { params });
// 列表页
const getListPage = params => axios.get("./static/list.json", { params });
// 购物车页面
const getCartPage = params => axios.get("./static/cart.json", { params });
// 存储收获地址
const saveAddress = params => axios.post("./mock/success", params);
// 商品列表
// const getGoodsList = params => axios.get('/api/rest/catalog/product?category=7', { params });


const getGoodsList = params => axios.get("./mock/goods", { params });


const getGoodsListBySku = params =>
    axios.get("/api/rest/catalog/product", { params });
// 登录页
const login = params => axios.post("/oauth/login", params);
// 购物车相关
// const getGoodsListOfCart = params => axios.get('./static/cartGoodsList.json', { params });
const getGoodsListOfCart = params =>
    axios.get("/api/rest/cart/item", { params });
const getCartRecommend = params =>
    axios.get(
        "/api/rest/catalog/product?skus[]=YB1353&skus[]=YB1264&skus[]=XS1386&skus[]=XS1325&skus[]=YB1384",
        { params }
    );
const getCartGiftList = params =>
    axios.get("./static/cartGoodsList.json", { params });
const addGoodsToCart = data => axios.post("/api/rest/cart/item", data);
const editGoodsOfCart = data => axios.put("/api/rest/cart/item", data);
const removeGoodsFromCart = data =>
    axios.delete("/api/rest/cart/item", { data });
const getTotalOfCart = params => axios.get("/api/rest/cart/total", { params });
// 优惠券
const useCoupon = data => axios.post("/api/rest/cart/coupon", data);
const restoreCoupon = data => axios.delete("/api/rest/cart/coupon", { data });
// 国家 / 省(洲) / 市
const getCountry = () => axios.get("/api/rest/directory/country");
const getRegion = params => axios.get("/api/rest/directory/region", { params });

// 地址相关
const getShippingAddress = params =>
    axios.get("/api/rest/checkout/address/shipping", { params });
const saveShippingAddress = data =>
    axios.post("/api/rest/checkout/address/shipping", data);

// 运输费用
const getShippingFee = param =>
    axios.get("/api/rest/checkout/shipping", { params });

// 暴露
export default {
    getFont,
    getShippingFee,
    saveShippingAddress,
    getShippingAddress,
    getCountry,
    getRegion,
    getGoodsList,
    getCartPage,
    saveAddress,
    getGoodsListBySku,
    login,
    getIndexPage,
    getListPage,
    getGoodsListOfCart,
    getCartRecommend,
    addGoodsToCart,
    editGoodsOfCart,
    removeGoodsFromCart,
    useCoupon,
    getTotalOfCart,
    useCoupon,
    restoreCoupon
};
