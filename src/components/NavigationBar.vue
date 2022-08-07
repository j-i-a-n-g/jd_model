<template>
  <div class="navigation z-index-max" :style="navBarStyle"
  :class="{'bottom-line': pageName}">
    <!-- 左侧 -->
    <div class="left">
      <img src="@img/back.svg" alt="" v-if="isShowBack" @click="$emit('onLeftClick')">
      <!-- 具名插槽 -->
      <slot name="nav-left"></slot>
    </div>
    <!-- 中间位置 -->
    <div class="center">
      <span class="page-title" v-if="pageName">{{pageName}}</span>
      <!-- 具名插槽 -->
      <slot name="nav-center"></slot>
    </div>
    <!-- 右侧位置 -->
    <div class="right">
    <!-- 具名插槽 -->
    <slot name="nav-right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar',
  props: {
    // 页面标题名称
    pageName: {
      type:String,
      default:''
    },
    // 是否展示左侧返回的按钮
    isShowBack: {
      type: Boolean,
      default: true
    },
    // navBar 样式
    navBarStyle: {
      type: Object,
      default: function() {
        return {
          backgroundColor: '#fff'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.navigation {
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  display: flex;
  justify-content: space-between;
  // 适配沉浸式手机APP
  padding-top: $StatusBarHeight;
  .left, .right {
    display: flex;
    width: px2rem(26);
    height: 100%;
    padding: 0 $marginSize;
    img {
      width: 100%;
      align-items: center;
    }
  }
  .center {
    height: 100%;
    display: flex;
    flex-grow: 1;
    .page-title {
      font-size: $titleSize;
      align-self: center;
      margin: 0 auto;
    }
  }
}
.bottom-line {
  border-bottom: 1px solid #999;
}
.z-index-max {
  z-index: 999;
}
</style>