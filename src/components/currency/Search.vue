<template>
  <div class="search" :style="{backgroundColor: bgColor}">
    <img class="search-icon" :src=icon alt="">
    <span class="search-hint" :style="{color: hintColor}">混合京东商城项目</span>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    icon: {
      default: require('@img/search.svg'),
      type:String
    },
    hintColor: {
      type: String,
      default: '#999'
    },
    bgColor: {
      type: String,
      default: '#fff'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.search {
  background-color: #fff;
  width: 100%;
  margin: px2rem(6);
  border-radius: px2rem(22);
  display: flex;
  align-items: center;
  &-icon {
    margin-left: $marginSize;
    width: px2rem(16);
  }
  &-hint {
    font-size: $minInfoSize;
    margin-left: $marginSize;
    color: #999;
  }
}
</style>