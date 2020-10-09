import Vue from "vue";
import Vuex from "vuex";

// import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  // plugins: [createPersistedState()],

  state: {
    selected_symbol: "BTCUSDT",
    bids: [],
  },

  mutations: {
    select_symbol(state, symbol) {
      state.selected_symbol = symbol;
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

    async binance_get_initial_order_book_data({ commit }, { symbol, limit }) {
      console.log("get_initial");
      const entry_point = `https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=${limit}`;
      const response = await fetch(entry_point);
      const data = await response.json();
      commit("add_bids", data.bids);
    },

    binance_ws_connect({ commit }, stream_name) {
      const entry_point = `wss://stream.binance.com:9443/ws/${stream_name}`;
      const binance_ws = new WebSocket(entry_point);
      binance_ws.onmessage = ({ data }) => {
        let { b: bids, a: asks } = JSON.parse(data);
        bids = bids.filter((bid) => +bid[1] !== 0);
        commit("add_bids", bids);
      };
      setTimeout(() => {
        binance_ws.close();
      }, 5000);
    },

    // binance_ws_disconnect
  },

  modules: {},
});
