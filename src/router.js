import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/kosh-test",
    name: "OrderBook",
    component: () => import(/* webpackChunkName: "order_book" */ "./views/OrderBook.vue"),
  },
  {
    path: "/select",
    name: "Select",
    component: () => import(/* webpackChunkName: "select" */ "./views/Select.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
