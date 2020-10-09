import { mapState } from "vuex";

export default {
  install(Vue) {
    // Vue.binance_get_order_book = async function({ limit = 500, symbol = "BNBBTC" }) {
    //   const entry_point = `https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=${limit}`;
    //   const response = await fetch(entry_point);
    //   const data = await response.json();
    //   return data;
    // };
    // Vue.binance_ws_connect = function(stream_name) {
    //   const entry_point = `wss://stream.binance.com:9443/ws/${stream_name}`;
    //   const binance_ws = new WebSocket(entry_point);
    //   binance_ws.onmessage = ({ data }) => {
    //     const { b: bids, a: asks } = JSON.parse(data);
    //   };
    //   setTimeout(() => {
    //     binance_ws.close();
    //   }, 5000);
    // };
  },
};
