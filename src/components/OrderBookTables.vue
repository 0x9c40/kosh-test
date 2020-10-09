<template>
  <div>
    <div class="table">
      <div class="table-head">Bids</div>
      <div class="row">
        <div class="cell">Amount</div>
        <div class="cell">Price</div>
        <div class="cell">Total</div>
      </div>
      <div class="row" v-for="(bid, index) in bids" :key="index">
        <div class="cell">{{ bid[1] }}</div>
        <div class="cell">{{ Number(bid[0]).toFixed(2) }}</div>
        <div class="cell">{{ Number(bid[0] * bid[1]).toFixed(2) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "OrderBookTables",

  data() {
    return {};
  },

  computed: {
    ...mapState({ bids: (state) => state.bids, selected_symbol: (state) => state.selected_symbol }),
  },

  async beforeMount() {
    this.binance_get_initial_order_book_data({ symbol: this.selected_symbol, limit: 500 });

    this.binance_ws_connect("btcusdt@depth");
  },

  methods: {
    ...mapActions(["binance_get_initial_order_book_data", "binance_ws_connect"]),
  },
};
</script>

<style lang="scss">
.table-head {
  display: flex;
  background-color: var(--color-secondary);
  color: white;
  justify-content: center;
  border: 1px solid var(--color-primary);
}
.table {
  width: 480px;
  height: calc(100vh - var(--header-height));
  overflow-y: scroll;
}
.row {
  display: flex;
}
.cell {
  width: 160px;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  display: flex;
  padding-left: 24px;
  align-items: center;
  height: 24px;
}
</style>
