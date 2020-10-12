<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <div class="header-container">
          <div class="selected-symbol">{{ active_symbol }}</div>
          <router-link to="/kosh-test" class="header-button">Data</router-link>
          <router-link to="/select" class="header-button">Select</router-link>
        </div>
      </div>
    </div>
    <div class="container">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      active_symbol: (state) => state.active_symbol,
    }),
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
  height: var(--header-height);
  border-bottom: 1px solid red;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.2);
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
}

.header-button,
.selected-symbol {
  background-color: var(--color-primary);
  color: white;
  height: 32px;
  padding: 0px 10px;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  display: flex;
  text-transform: uppercase;
  transition: background-color 0.1s;
  transition: box-shadow 0.1s;
  box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.2);
  font-weight: bold;

  &:not(:first-child) {
    margin-left: 32px;
  }

  &:hover {
    background-color: var(--color-secondary);
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
}

.selected-symbol {
  background-color: var(--color-secondary);
  box-shadow: none;
}

.container {
  display: block;
  width: 1200px;
  height: 100%;
  margin: auto;

  @media (max-width: 1200px) {
    width: 960px;
  }

  @media (max-width: 960px) {
    width: 640px;
  }

  @media (max-width: 640px) {
    width: 320px;
  }
}
</style>
