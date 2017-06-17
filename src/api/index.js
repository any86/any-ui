import axios from "axios";
const getGoodsList = params => axios.get("./mock/imgs", { params });

const getBagPage = params => axios.get("./static/bag.json", { params });


export default {
  getGoodsList, 
  getBagPage
}