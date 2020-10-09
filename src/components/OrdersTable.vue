<template>
  <div class="orders-table">
    <div>
      <div class="orders-table__head">{{ name }}</div>
      <div class="orders-table__column-names">
        <div class="orders-table__cell">Amount</div>
        <div class="orders-table__cell">Price</div>
        <div class="orders-table__cell">Total</div>
      </div>
    </div>
    <div class="orders-table__content">
      <div v-for="(order, index) in orders" :key="index" class="orders-table__row">
        <div class="orders-table__cell">{{ order[1] }}</div>
        <div class="orders-table__cell">{{ Number(order[0]).toFixed(2) }}</div>
        <div class="orders-table__cell">{{ Number(order[0] * order[1]).toFixed(4) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { scrollbarWidth } from "@xobotyi/scrollbar-width";

let root = document.documentElement;
root.style.setProperty("--scroll-width", `${scrollbarWidth()}px`);

export default {
  name: "OrdersTable",

  props: {
    orders: Array,
    name: String,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss">
.orders-table {
  width: 100%;
  max-width: 480px;
  border: 1px solid var(--color-primary);

  &:hover {
    .orders-table__content {
      overflow-y: scroll;
    }
    .orders-table__column-names {
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
    height: calc(100vh - var(--header-height) - 48px);
  }

  &__row {
    display: flex;
    border-bottom: 1px solid var(--color-primary);
  }

  &__cell {
    flex: 1;
    padding-left: 16px;
    height: 24px;
    display: flex;
    align-items: center;

    &:not(:first-child) {
      border-left: 1px solid var(--color-primary);
    }
  }
}
</style>
