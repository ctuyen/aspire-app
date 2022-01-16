import { createStore } from "vuex";
import card from "../store/modules/card";

const store = createStore({
  modules: { card },
});

export default store;
