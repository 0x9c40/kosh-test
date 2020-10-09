<template>
  <div>
    <div class="table">
      <div class="row" v-for="bid in bids" :key="bid[0]">
        <div class="cell">{{ bid[0] }}</div>
        <div class="cell">{{ bid[1] }}</div>
        <div class="cell">{{ bid[0] * bid[1] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "OrderBookTables",

  data() {
    return {
      bids: [
        ["0.0024", "10"],
        ["0.0034", "20"],
      ],
    };
  },

  async mounted() {
    // const binance_ws = new WebSocket("wss://stream.binance.com:9443/ws/bnbbtc@depth");
    // binance_ws.onmessage = ({ data }) => {
    //   const { b: bids, a: asks } = JSON.parse(data);
    //   this.bids = bids;
    // };
    // setTimeout(() => {
    //   binance_ws.close();
    // }, 5000);

    const data = await Vue.binance_get_order_book({ limit: 500, symbol: "BNBBTC" });
    this.bids = data.bids;
    console.log(data);
  },
};
</script>

<style lang="scss">
.row {
  display: flex;
}
.cell {
  width: 200px;
}
</style>
