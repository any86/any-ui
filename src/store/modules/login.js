import { SAVE_ACCESS_TOKEN, SAVE_USER_NAME, EXIT } from '../mutation-types.js'

const state = {
    accessToken: localStorage.getItem('accessToken'),
    userName: localStorage.getItem('userName'),
    avator: localStorage.getItem('avator'),
    name: localStorage.getItem('name')
};

// actions
const actions = {
    login({ commit, state }, { userName, password }) {
        return new Promise((resolve, reject) => {
                axios.post(LOGIN_URL, qs.stringify({ userName, password }))
                .then((response) => {
                // 登陆成功
                if (1 == response.data.status) {
            commit(EXIT);
            commit('saveUserName', userName);
            commit('saveAvator', response.data.data.avator);
            commit('saveName', response.data.data.name);
            commit('saveAccessToken', response.data.data.accessToken);
            // 设置全局token
            axios.defaults.headers.common['Access-Token'] = response.data.data.accessToken;
        }
        resolve(response.data);
    })
    .catch((error) => {
            reject(error);
    });
    });
    }
};

// mutations.
const mutations = {
    /**
     * 存储头像到缓存
     */
    saveAvator(state, avator){
        state.avator = avator;
        localStorage.setItem('avator', avator);
    },
    /**
     * 存储昵称到缓存
     */
    saveName(state, name){
        state.name = name;
        localStorage.setItem('name', name);
    },

    /**
     * 存储accessToken
     */
        [SAVE_ACCESS_TOKEN](state, accessToken) {
        state.accessToken = accessToken;
        localStorage.setItem('accessToken', accessToken);
    },
    /**
     * 存储userName
     */
        [SAVE_USER_NAME](state, userName) {
        state.userName = userName;
        localStorage.setItem('userName', userName);
    },
    /**
     * 退出登陆
     */
        [EXIT](state) {
        state.accessToken = '';
        localStorage.removeItem('accessToken');
    }
};

export default {
    state,
    actions,
    mutations
};
