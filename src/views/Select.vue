<template>
  <div class="select-view">
    <select v-model="selected" @change="select_symbol(selected)" class="select-box">
      <option v-for="symbol in symbols" :key="symbol">{{ symbol }}</option>
    </select>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "Select",

  components: {},

  data() {
    return {
      symbols: ["BTCUSDT", "BNBBTC", "ETHBTC"],
      selected: "",
    };
  },

  computed: {
    ...mapState({ active_symbol: (state) => state.active_symbol }),
  },

  created() {
    this.selected = this.active_symbol;
  },

  methods: {
    ...mapActions(["select_symbol"]),
  },
};
</script>

<style lang="scss">
.select-view {
  padding-top: 24px;
}

.select-box {
  background-color: var(--color-primary);
  color: white;
  padding: 12px;
  width: 250px;
  border: none;
  font-size: 20px;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
  outline: none;
  option {
    padding: 30px;
  }
}
</style>
