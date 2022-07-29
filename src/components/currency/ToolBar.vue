<template>
<div class="tool-bar">
  <!-- tab按钮 -->
  <div class="tool-bar-item" v-for="(item, index) in toolBarData" :key="index" @click="onChangeFragment(item.componentName, index)">
    <img class="tool-bar-item-img" :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" alt="">
    <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h': index === selectItemIndex ? true : false}">{{item.name}}</p>
  </div>
</div>
</template>

<script>
export default {
  name: 'ToolBar',
  data() {
    return {
      // 控制图标是否点亮
      selectItemIndex: 0,
      // tab 按钮数据源
      toolBarData: [
        {
          // 默认状态下的图片
          nIcon: require('@img/home-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@img/home-h.svg'),
          // 名称
          name: '首页',
          // 点击tab后跳转的组件名称
          componentName: 'Home'
        },
                {
          // 默认状态下的图片
          nIcon: require('@img/shopping-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@img/shopping-h.svg'),
          // 名称
          name: '购物车',
          // 点击tab后跳转的组件名称
          componentName: 'Shopping'
        },
                {
          // 默认状态下的图片
          nIcon: require('@img/my-n.svg'),
          // 高亮状态下的图片
          hIcon: require('@img/my-h.svg'),
          // 名称
          name: '我的',
          // 点击tab后跳转的组件名称
          componentName: 'My'
        }
      ]
    }
  },
  methods: {
    onChangeFragment: function(componentName, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', componentName)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.tool-bar {
  width: 100%;
  height: px2rem(66);
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
  border-top: 1px solid $lineColor;

  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }

    &-name {
      font-size: px2rem(14);
      margin-top: px2rem(4);

      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>
