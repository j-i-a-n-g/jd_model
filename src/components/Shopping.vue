<template>
<div class="shopping">
  <navigation-bar :pageName="pageName" :isShowBack="false"></navigation-bar>
  Shopping
</div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
export default {
 name: 'Shopping',
 data() {
  return {
    pageName: '购物车'
  }
 },
 components: {
  NavigationBar
 }
}
</script>


  NavigationBar<style lang="scss" scoped>
.shopping {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
