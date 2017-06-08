var getGoodsList = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    axios
      .get('./mock/imgs', { params })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export default {
  getGoodsList
};
