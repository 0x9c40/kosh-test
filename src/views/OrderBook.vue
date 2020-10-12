<template>
  <div class="order-book-view" @click="binance_ws.close()">
    <OrderTable :orders="bids" name="Bids" />
    <OrderTable :orders="asks" name="Asks" />
  </div>
</template>

<script>
import Vue from "vue";
import remove from "lodash/remove";
import fromPairs from "lodash/fromPairs";
import cloneDeep from "lodash/cloneDeep";
import merge from "lodash/merge";
import omitBy from "lodash/omitBy";
import toPairs from "lodash/toPairs";
import sortBy from "lodash/sortBy";
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
      lastUpdateId: undefined,
      binance_ws: "",
      events_buffer: [],
      guard: false,
      order_book_patch: {},
      is_order_book_initialized: false,
      current_depth_update: undefined,
    };
  },

  computed: {
    ...mapState({ active_symbol: (state) => state.active_symbol }),
    ...mapGetters(["stream_name"]),
  },

  watch: {
    async active_symbol(new_val, old_val) {},

    current_depth_update(new_update) {
      if (!this.is_order_book_initialized) return;
      let bids_obj = fromPairs(this.bids);
      merge(bids_obj, fromPairs(new_update.b));
      bids_obj = omitBy(bids_obj, (val) => +val === 0);
      this.bids = sortBy(toPairs(bids_obj), (item) => +item[0]).reverse();
    },
  },

  async beforeMount() {
    this.binance_ws = Vue.binance_make_ws(this.stream_name);

    this.binance_ws.onmessage = async ({ data: data_string }) => {
      let data = JSON.parse(data_string);
      if (!this.is_order_book_initialized) this.events_buffer.push(data);
      this.current_depth_update = data;

      if (this.guard) return;
      this.guard = true;

      let all_orders = await Vue.binance_fetch_order_book({ symbol: this.active_symbol, limit: 10 });

      this.bids = all_orders.bids;
      this.asks = all_orders.asks;
      this.lastUpdateId = all_orders.lastUpdateId;

      remove(this.events_buffer, (event) => event.u <= all_orders.lastUpdateId);

      this.events_buffer.forEach((event) => {
        let bids_obj = merge(fromPairs(this.bids), fromPairs(event.b));
        this.bids = toPairs(bids_obj);
        let asks_obj = merge(fromPairs(this.asks), fromPairs(event.a));
        this.asks = toPairs(asks_obj);
      });

      this.is_order_book_initialized = true;
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
