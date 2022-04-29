import Vue from "vue";
import App from "@/App.vue";
import router from "@/plugins/router";

import "@/styles/main.css";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");