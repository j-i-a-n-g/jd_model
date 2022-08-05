<template>
<div class="main">
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
  <ToolBar @onChangeFragment="onChangeFragment"></ToolBar>
</div>
</template>

<script>
import ToolBar from '@/components/currency/ToolBar.vue'
export default {
  name: 'Main',
  data() {
    return {
      currentComponent: 'Home'
    }
  },
  methods: {
    onChangeFragment: function(componentName) {
      this.currentComponent = componentName
    }
  },
  components: {
    ToolBar,
    // 异步组件
    'Home': () => import('@c/Home'),
    'Shopping': () => import('@c/Shopping'),
    'My': () => import('@c/My')
    }
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
}
</style>