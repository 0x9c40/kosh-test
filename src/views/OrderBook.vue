<template>
  <div class="order-book-view">
    <OrderTable :orders="bids" name="Bids" />
    <OrderTable :orders="asks" name="Asks" />
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapGetters, mapActions } from "vuex";
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
      binance_ws: "",
    };
  },

  computed: {
    ...mapState({ active_symbol: (state) => state.active_symbol }),
    ...mapGetters(["stream_name"]),
  },

  watch: {
    async active_symbol(new_val, old_val) {
      const all_orders = await Vue.binance_fetch_order_book({ symbol: this.active_symbol });
      this.bids = all_orders.bids;
      this.asks = all_orders.asks;

      this.binance_ws.close();

      this.binance_ws = Vue.binance_make_ws(this.stream_name);

      this.binance_ws.onmessage = ({ data: data_string }) => {
        let data = JSON.parse(data_string);
        this.add_diff(data);
        let { b: bids, a: asks } = data;
        bids = bids.filter((bid) => +bid[1] !== 0);
        asks = asks.filter((ask) => +ask[1] !== 0);
        this.bids.unshift(...bids);
        this.asks.unshift(...asks);
      };
    },
  },

  async beforeMount() {
    const all_orders = await Vue.binance_fetch_order_book({ symbol: this.active_symbol });
    this.bids = all_orders.bids;
    this.asks = all_orders.asks;

    this.binance_ws = Vue.binance_make_ws(this.stream_name);

    this.binance_ws.onmessage = ({ data: data_string }) => {
      let data = JSON.parse(data_string);
      this.add_diff(data);
      let { b: bids, a: asks } = data;
      bids = bids.filter((bid) => +bid[1] !== 0);
      asks = asks.filter((ask) => +ask[1] !== 0);
      this.bids.unshift(...bids);
      this.asks.unshift(...asks);
    };
  },

  methods: {
    ...mapActions(["add_diff"]),
  },
};
</script>

<style lang="scss">
.order-book-view {
  display: flex;
  padding: 24px 0px;
  height: calc(100vh - var(--header-height));
  max-height: calc(100vh - var(--header-height));

  @media (max-width: 640px) {
    flex-direction: column;
    padding: 12px 0px;
  }
}
</style>
