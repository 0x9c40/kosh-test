<template>
  <div class="home">
    <OrderBookTables />
    <OrdersTable :orders="bids" name="Bids" />
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import OrderBookTables from "../components/OrderBookTables.vue";
import OrdersTable from "../components/OrdersTable.vue";

export default {
  name: "Home",

  components: {
    OrderBookTables,
    OrdersTable,
  },

  data() {
    return {
      msg: "Home",
    };
  },

  computed: {
    ...mapState({ bids: (state) => state.bids }),
  },

  created() {},
};
</script>

<style lang="scss">
.home {
  display: flex;
}
</style>
