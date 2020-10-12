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
import findIndex from "lodash/findIndex";
import sortedIndexBy from "lodash/sortedIndexBy";
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
      last_update_id: undefined,
      binance_ws: "",
      init_events_buffer: [],
      guard: false,
      order_book_initialized: false,
      last_diff: undefined,
    };
  },

  computed: {
    ...mapState({ active_symbol: (state) => state.active_symbol }),
    ...mapGetters(["stream_name"]),
  },

  watch: {
    async active_symbol(new_val, old_val) {},

    last_diff({ b: bids_patches, a: asks_patches }) {
      if (!this.order_book_initialized) return;
      bids_patches.forEach((patch) => this.apply_patch(patch, "bids"));
      asks_patches.forEach((patch) => this.apply_patch(patch, "asks"));
    },
  },

  async beforeMount() {
    this.binance_ws = Vue.binance_make_ws(this.stream_name);

    this.binance_ws.onmessage = async ({ data: data_string }) => {
      let data = JSON.parse(data_string);
      if (!this.order_book_initialized) this.init_events_buffer.push(data);
      this.last_diff = data;

      if (this.guard) return;
      this.guard = true;

      let { bids, asks, lastUpdateId: last_update_id } = await Vue.binance_fetch_order_book({ symbol: this.active_symbol, limit: 10 });

      this.bids = cloneDeep(bids); // why do I need to do this?
      this.asks = asks;
      this.last_update_id = last_update_id;

      remove(this.init_events_buffer, (event) => event.u <= last_update_id);

      this.init_events_buffer.forEach(({ b: bids_patches, a: asks_patches }) => {
        bids_patches.forEach((patch) => this.apply_patch(patch, "bids"));
        asks_patches.forEach((patch) => this.apply_patch(patch, "asks"));
      });

      this.order_book_initialized = true;
    };
  },

  methods: {
    ...mapActions(["add_diff"]),

    apply_patch(patch, order_type) {
      let [patch_price, patch_amount] = patch;
      let index = findIndex(this[order_type], ([order_price]) => order_price === patch_price);

      let found = index !== -1;
      let need_to_remove = +patch_amount === 0;

      if (!found && need_to_remove) return;
      if (found && need_to_remove) {
        this[order_type].splice(index, 1);
      }
      if (!found && !need_to_remove) {
        let sorted_index;
        if (order_type === "bids") {
          sorted_index = this[order_type].length - sortedIndexBy(cloneDeep(this[order_type]).reverse(), patch, (o) => +o[0]);
        } else {
          sorted_index = sortedIndexBy(this[order_type], patch, (o) => +o[0]);
        }
        this[order_type].splice(sorted_index, 0, patch);
      }
      if (found && !need_to_remove) {
        this[order_type].splice(index, 1, patch);
      }
    },
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
