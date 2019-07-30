<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import test from "@/mixin/test.js";
import { getName } from "@/api/index.js";
export default {
  mixins: [test],
  name: "home",
  components: {
    HelloWorld
  },

  myOptions: {
    name: "zhangs"
  },

  created() {
    console.log("后调用");
    console.log(this.$options.myOptions);
    getName();
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: $h500;
}
</style>
