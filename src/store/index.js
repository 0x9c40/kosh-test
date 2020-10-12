import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    active_symbol: "BTCUSDT",
    diffs: [],
  },

  getters: {
    stream_name: (state) => `${state.active_symbol.toLowerCase()}@depth`,
  },

  mutations: {
    select_symbol(state, symbol) {
      state.active_symbol = symbol;
    },

    add_diff(state, diff) {
      state.diffs.unshift(diff);
    },
  },

  actions: {
    select_symbol({ commit }, symbol) {
      commit("select_symbol", symbol);
    },

    add_diff({ commit }, diff) {
      commit("add_diff", diff);
    },
  },
});
