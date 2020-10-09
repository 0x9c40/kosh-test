<template>
  <div>
    <OrderBookTables />
  </div>
</template>

<script>
import OrderBookTables from "../components/OrderBookTables.vue";

export default {
  name: "Home",

  components: {
    OrderBookTables,
  },

  data() {
    return {
      msg: "Home",
    };
  },
};
</script>
