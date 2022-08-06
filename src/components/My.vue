<template>
<div class="my">
  <navigation-bar :pageName="pageName" :isShowBack="false"></navigation-bar>
</div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
export default {
 name: 'My' ,
  data() {
  return {
    pageName: '个人中心'
  }
 },
 components: { NavigationBar },
}
</script>

<style lang="scss" scoped>
.my {
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>
