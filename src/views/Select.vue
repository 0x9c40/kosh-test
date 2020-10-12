<template>
  <div class="select-view">
    <select v-model="selected" @change="select_symbol(selected)" class="select-box">
      <option v-for="symbol in symbols" :key="symbol">{{ symbol }}</option>
    </select>
    <ul class="diff-list">
      <li v-for="(diff, index) in diffs" :key="index" class="diff-list-item">
        <div class="diff-prop">
          <div class="diff-prop__name">Symbol:</div>
          <div class="diff-prop__value">{{ diff.s }}</div>
        </div>
        <div class="diff-prop">
          <div class="diff-prop__name">First uID:</div>
          <div class="diff-prop__value">{{ diff.U }}</div>
        </div>
        <div class="diff-prop">
          <div class="diff-prop__name">Last uID:</div>
          <div class="diff-prop__value">{{ diff.u }}</div>
        </div>
        <div class="diff-prop">
          <div class="diff-prop__name">Bids:</div>
          <div class="diff-prop__value">{{ diff.b.length }}</div>
        </div>
        <div class="diff-prop">
          <div class="diff-prop__name">Asks:</div>
          <div class="diff-prop__value">{{ diff.a.length }}</div>
        </div>
        <div class="diff-prop">
          <div class="diff-prop__name">Event time:</div>
          <div class="diff-prop__value">{{ diff.E }}</div>
        </div>
      </li>
    </ul>
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
    ...mapState({
      active_symbol: (state) => state.active_symbol,
      diffs: (state) => state.diffs,
    }),
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

.diff-list {
  padding: 0;
  list-style: none;
}

.diff-list-item {
  display: flex;
  margin-bottom: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
  }
}

.diff-prop {
  padding-right: 20px;
}
</style>
