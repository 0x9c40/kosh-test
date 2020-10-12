import { mapState } from "vuex";

export default {
  install(Vue) {
    Vue.binance_fetch_order_book = async function({ limit = 500, symbol }) {
      const entry_point = `https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=${limit}`;
      const response = await fetch(entry_point);
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return data;
    };

    Vue.binance_make_ws = function(stream_name) {
      const entry_point = `wss://stream.binance.com:9443/ws/${stream_name}`;
      const binance_ws = new WebSocket(entry_point);
      return binance_ws;
    };
  },
};
