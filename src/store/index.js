import Vue from "vue";
import Vuex from "vuex";

// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],

  state: {
    active_symbol: "BTCUSDT",
    bids: [],
  },

  mutations: {
    select_symbol(state, symbol) {
      state.active_symbol = symbol;
    },

    add_bids(state, bids) {
      console.log("commit", bids);
      state.bids.unshift(...bids);
    },
  },

  actions: {
    select_symbol({ commit }, symbol) {
      commit("select_symbol", symbol);
    },
  },

  modules: {},
});
