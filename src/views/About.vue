<template>
  <div class="about">
    <!-- <h1>This is an about page</h1> -->
    <div class="box grey">
      <span>fadfa</span>
    </div>
  </div>
</template>

<script>
// import base from '@/assets/scss/base.module.scss'
export default {
  data() {
    return {
      baseStyle: {}
    };
  },

  mounted() {
    // this.baseStyle = base;
    // console.log(base);
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/base.scss";

$color: #999;

.about {
  .box {
    border: 1px solid $color;
    height: $h300;
    width: 300px;
    margin: 0 auto;
    background: url("~@/assets/logo.png") no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: $f50;
    }
  }
}
</style>
