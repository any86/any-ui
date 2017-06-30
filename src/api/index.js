import axios from "axios";
const getGoodsList = params => axios.get("./mock/imgs", { params });

const getBagPage = params => axios.get("./static/bag.json", { params });

const getZoneLevel1 = params => axios.get("./mock/zone1", { params });
const getZoneLevel2 = params => axios.get("./mock/zone2", { params });
const getZoneLevel3 = params => axios.get("./mock/zone3", { params });

const getZone = (level, params) => axios.get("./mock/zone" + (parseInt(level) + 1), { params });



export default {
    getGoodsList,
    getBagPage,
    getZoneLevel1,
    getZoneLevel2,
    getZoneLevel3,getZone,
};
