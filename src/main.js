import Vue from "vue";
import App from "@/App.vue";
import router from "@/plugins/router";

import "@/styles/main.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgM9ybPJzGVDkz8Oi_j6vn01RrDykBT6o",
  authDomain: "credit-calc-2226a.firebaseapp.com",
  projectId: "credit-calc-2226a",
  storageBucket: "credit-calc-2226a.appspot.com",
  messagingSenderId: "718920529683",
  appId: "1:718920529683:web:519a90c02d1ba451f80ce6",
};

// Initialize Firebase
initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
