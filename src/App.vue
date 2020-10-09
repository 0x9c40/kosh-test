<template>
  <div>
    <header>
      <router-link to="/">Data</router-link>
      <router-link to="/select">Select</router-link>
      <!-- <div @click="stop">Остановить</div> -->
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "hi",
    };
  },

  methods: {
    stop() {},
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
.basic {
  border: 1px solid grey;

  &__element {
    color: lime;
  }
}
</style>
