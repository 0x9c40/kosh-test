<template>
  <div>
    <header>
      <router-link to="/">Перейти к Foo</router-link>
      <router-link to="/select">Перейти к Bar</router-link>
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
};
</script>

<style lang="scss">
.basic {
  border: 1px solid grey;

  &__element {
    color: lime;
  }
}
</style>
