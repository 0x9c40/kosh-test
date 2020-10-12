import "core-js/stable";
import "regenerator-runtime/runtime.js";

import Vue from "vue";
import App from "./App.vue";

import store from "./store";
import router from "./router";
import BinanceSDK from "./plugins/BinanceSDK";

Vue.use(BinanceSDK);

const mounting_point = document.createElement("div");
mounting_point.id = "app";
document.body.appendChild(mounting_point);

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
