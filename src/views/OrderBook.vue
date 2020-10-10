<template>
  <div class="home">
    <OrderTable :orders="bids" name="Bids" />
    <div @click="ws.close()" class="close">stop</div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";
import OrderTable from "../components/OrderTable.vue";

export default {
  name: "OrderBook",

  components: {
    OrderTable,
  },

  data() {
    return {
      bids: [],
      asks: [],
      ws: "",
    };
  },

  computed: {
    ...mapState({ active_symbol: (state) => state.active_symbol }),
  },

  async beforeCreate() {
    const all_orders = await Vue.binance_fetch_order_book({});
    this.bids = all_orders.bids;

    this.ws = Vue.binance_ws_connect("btcusdt@depth", this);
  },
};
</script>

<style lang="scss">
.home {
  display: flex;
}
</style>
