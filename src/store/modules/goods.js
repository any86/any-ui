const state = {
  list: [],
  status: -1,
  detail: {},
  id: -1
};

// actions
const actions = {
  getList({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      axios
        .get("./mock/imgs", { params })
        .then(response => {
          if (1 == response.data.status) {
            commit("setList", response.data.data);
          }
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

// mutations.
const mutations = {
  setList(state, list) {
    state.list = list;
  }
};

export default {
  state,
  actions,
  mutations
};
