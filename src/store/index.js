import Vue from "vue";
import Vuex from "vuex";

// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],

  state: {
    active_symbol: "BTCUSDT",
    diffs: [],
    events_buffer: [],
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

  modules: {},
});
