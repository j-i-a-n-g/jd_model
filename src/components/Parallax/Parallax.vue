<!-- 视差滚动效果实现组件 -->
<template>
  <div class="parallax" @scroll="onScrollChange">
    <!-- 缓慢移动区 -->
    <div class="parallax-slow"  :style="{top: parallaxSlowTop}">
      <slot name="parallax-slow"></slot>
    </div>
    <div class="parallax-normal z-index-2">
      <slot name="parallax-normal"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Parallax',
  data() {
    return {
      // 滚动的距离
      scrollTop: -1,
      // 滚动速度的倍数差距
      SPEED_DIFF: 2
    }
  },
  methods: {
    // 监听视差缓冲组件的滚动事件
    onScrollChange($event) {
      this.scrollTop = $event.target.scrollTop
      // 滚动事件触发之后，通过$emit向父组件传值
      this.$emit('onScrollChange', this.scrollTop)
    }
  },
  computed: {
    // 计算需要通过 top 缓冲多少距离
    /**
     * 1. 使用监听得到的正常滚动距离 / 滚动速度的倍数差距 = 缓慢移动区的滚动距离
     * 2. 使用监听得到的正常滚动距离 - 缓慢移动区的滚动距离 = 缓慢移动区的相对定位top值
     */
    parallaxSlowTop: function() {
      return (this.scrollTop - (this.scrollTop / this.SPEED_DIFF)) + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.parallax {
  width: 100%;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  &-slow {
    width: 100%;
    position: relative;
  }
  &-normal {
    width: 100%;
    position: relative;
  }
}
</style>