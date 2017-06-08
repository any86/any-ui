import axios from "axios";
const getGoodsList = params => axios.get("./mock/imgs", { params });

export default {
  getGoodsList
}