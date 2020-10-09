<template>
  <div id="app">
    <div class="header">
      <div class="selected-symbol">{{ selected_symbol }}</div>
      <router-link to="/" class="header-button">Data</router-link>
      <router-link to="/select" class="header-button">Select</router-link>
      <!-- <div @click="stop">Остановить</div> -->
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      msg: "hi",
    };
  },

  computed: {
    ...mapState({
      selected_symbol: (state) => state.selected_symbol,
    }),
  },

  methods: {
    stop() {},
  },
};
</script>

<style lang="scss">
:root {
  --header-height: 48px;
  --color-primary: #0563af;
  --color-secondary: #a3cef1;
}
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
}

.header {
  display: flex;
  align-items: center;
  height: var(--header-height);
  border-bottom: 2px solid red;
  // margin-bottom: 24px;
}

.header-button,
.selected-symbol {
  background-color: var(--color-primary);
  color: white;
  height: 32px;
  width: 100px;
  text-decoration: none;
  margin-left: 32px;
  align-items: center;
  justify-content: center;
  display: flex;
  text-transform: uppercase;
  transition: background-color 0.1s;
  transition: box-shadow 0.1s;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  font-weight: bold;

  &:hover {
    background-color: var(--color-secondary);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
}

.selected-symbol {
  background-color: var(--color-secondary);
  box-shadow: none;
}
</style>
