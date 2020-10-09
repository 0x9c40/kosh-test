<template>
  <div class="box">
    <select v-model="selected" @change="select_symbol(selected)">
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
    ...mapState({ selected_symbol: (state) => state.selected_symbol }),
  },

  created() {
    this.selected = this.selected_symbol;
  },

  methods: {
    ...mapActions(["select_symbol"]),
  },
};
</script>

<style lang="scss">
.box {
  select {
    background-color: var(--color-primary);
    color: white;
    padding: 12px;
    width: 250px;
    border: none;
    font-size: 20px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    -webkit-appearance: button;
    appearance: button;
    outline: none;
    option {
      padding: 30px;
    }
  }
  &::before {
    content: "\f13a";
    font-family: FontAwesome;
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    height: 100%;
    text-align: center;
    font-size: 28px;
    line-height: 45px;
    color: rgba(255, 255, 255, 0.5);
    background-color: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
  &:hover {
    &::before {
      color: rgba(255, 255, 255, 0.6);
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
}
</style>
