export default {
  state: () => ({
    number: "123123",
    status: "active",
  }),
  getters: {},
  mutations: {
    UPDATE_STATUS(state: any, payload: String) {
      state.card.status = payload;
    },
  },
  actions: {
    updateStatus({ commit }, data: String) {
      commit("UPDATE_STATUS", data);
    },
  },
};
