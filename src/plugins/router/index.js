import Vue from "vue";
import VueRouter from "vue-router";
import { R_CALCULATOR, R_HOME } from "./routerNames";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: R_HOME,
    redirect: { name: R_CALCULATOR },
  },
  {
    path: "/calculator",
    name: R_CALCULATOR,
    component: () =>
      import(/* webpackChunkName: "calculator" */ "@/views/Calculator.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
