export default {
  state: () => ({
    myCards: [],
    companyCards: [],
  }),
  getters: {},
  mutations: {
    UPDATE_MY_CARD_LIST(state, payload) {
      state.myCards = payload;
    },
    ADD_MY_CARD(state, payload) {
      state.myCards.push(payload);
    },
    CANCEL_MY_CARD(state, payload) {
      state.myCards = state.myCards.filter((item) => item.number !== payload);
    },
    UPDATE_STATUS(state, payload) {
      state.myCards = state.myCards.map((item) => {
        if (item.number === payload.number) {
          item.status = payload.status;
        }
        return item;
      });
    },
  },
  actions: {
    updateMyCardList({ commit }, data) {
      commit("UPDATE_MY_CARD_LIST", data);
    },
    addMyCard({ commit }, data) {
      commit("ADD_MY_CARD", data);
    },
    cancelMyCard({ commit }, data) {
      commit("CANCEL_MY_CARD", data);
    },
    updateStatus({ commit }, data) {
      commit("UPDATE_STATUS", data);
    },
  },
};
