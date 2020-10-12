<template>
  <div class="order-table">
    <div>
      <div class="order-table__head">{{ name }}</div>
      <div class="order-table__column-names">
        <div class="order-table__cell">Amount</div>
        <div class="order-table__cell">Price</div>
        <div class="order-table__cell">Total</div>
      </div>
    </div>
    <div class="order-table__content">
      <div v-for="(order, index) in orders" :key="index" class="order-table__row">
        <div class="order-table__cell">{{ +order[1] }}</div>
        <div class="order-table__cell">{{ +order[0] }}</div>
        <div class="order-table__cell">{{ total(...order) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

import { scrollbarWidth } from "@xobotyi/scrollbar-width";

let root = document.documentElement;
root.style.setProperty("--scroll-width", `${scrollbarWidth()}px`);

export default {
  name: "OrderTable",

  props: {
    orders: Array,
    name: String,
  },

  data() {
    return {};
  },

  methods: {
    total(price, amount) {
      return (price * amount).toFixed(6);
    },
  },
};
</script>

<style lang="scss">
.order-table {
  width: 100%;
  height: 100%;
  max-width: 450px;
  border: 1px solid var(--color-primary);

  &:not(:last-child) {
    margin-right: 32px;
  }

  &:hover {
    .order-table__content {
      overflow-y: scroll;
    }
    .order-table__column-names {
      padding-right: var(--scroll-width);
    }
  }

  &__head {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--color-secondary);
    color: white;
  }

  &__column-names {
    height: 24px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-primary);
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  }

  &__content {
    overflow-y: hidden;
    height: calc(100% - 48px); //head and column_names subtructed
  }

  &__row {
    display: flex;
    border-bottom: 1px solid var(--color-primary);
  }

  &__cell {
    flex: 1;
    padding-left: 6px;
    height: 24px;
    display: flex;
    align-items: center;

    &:not(:first-child) {
      border-left: 1px solid var(--color-primary);
    }

    &:last-child {
      justify-content: flex-end;
      padding-right: 16px;
    }
  }

  @media (max-width: 960px) {
    &__cell {
      &:last-child {
        display: none;
      }
    }
  }

  @media (max-width: 640px) {
    max-width: 320px;
    height: 50%;
  }
}
</style>
