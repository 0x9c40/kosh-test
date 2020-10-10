import { mapState } from "vuex";

export default {
  install(Vue) {
    Vue.binance_fetch_order_book = async function({ limit = 500, symbol = "BTCUSDT" }) {
      const entry_point = `https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=${limit}`;
      const response = await fetch(entry_point);
      const data = await response.json();
      return data;
    };

    Vue.binance_ws_connect = function(stream_name, bus) {
      const entry_point = `wss://stream.binance.com:9443/ws/${stream_name}`;
      const binance_ws = new WebSocket(entry_point);
      binance_ws.onmessage = ({ data }) => {
        let { b: bids, a: asks } = JSON.parse(data);
        bids = bids.filter((bid) => +bid[1] !== 0);
        bus.bids.unshift(...bids);
      };
      return binance_ws;
    };
  },
};
