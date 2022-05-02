<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import * as Names from "@/plugins/router/routerNames";
export default {
  name: "App",
  provide: { Names },
};
</script>
