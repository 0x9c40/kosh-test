import Vue from "vue";
import Vuex from "vuex";

import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
    selected_symbol: "BTCUSDT",
  },

  mutations: {
    select_symbol(state, symbol) {
      state.selected_symbol = symbol;
    },
  },

  actions: {
    select_symbol({ commit }, symbol) {
      commit("select_symbol", symbol);
    },
  },

  modules: {},
});
