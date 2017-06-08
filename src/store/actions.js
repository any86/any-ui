/**
 * 获取菜单数据
 */
var getMenuList = ({ commit, state }) => {
    return new Promise((resolve, reject) => {
        axios.get(MENU_URL).then(response => {
            resolve(response.data);
        }).catch((error) => {
            reject(error);
        });
    });
}

export default {
    getMenuList
}