<template>
<div class="main">
  <keep-alive>
    <component :is="currentComponent"></component>
  </keep-alive>
  <ToolBar ref="toolBar" @onChangeFragment="onChangeFragment"></ToolBar>
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
  activated() {
    this.pushFragment()
  },
  methods: {
    onChangeFragment: function(componentName) {
        this.currentComponent = componentName
    },
    // 指定需要加载的组件
    pushFragment: function() {
      if(!this.$route.params.componentIndex) return
        let componentIndex = this.$route.params.componentIndex
        this.$refs.toolBar.pushFragment(componentIndex)
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
  flex-flow: column;
  position: absolute;
}
</style>