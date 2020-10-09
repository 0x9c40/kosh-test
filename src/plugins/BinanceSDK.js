export default {
  install(Vue) {
    Vue.binance_get_order_book = async function({ limit = 500, symbol = "BNBBTC" }) {
      const entry = `https://www.binance.com/api/v1/depth?symbol=${symbol}&limit=${limit}`;
      const response = await fetch(entry);
      const data = await response.json();
      return data;
    };
  },
};
