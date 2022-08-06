<!-- 商品数量计算组件 -->
<template>
  <div class="count-manager">
    <span class="count-manager-less" :class="{'count-manager-disabled' : count === 1}" @click="onLessCount">-</span>
    <span class="count-manager-count">{{count}}</span>
    <span class="count-manager-add" @click="count++">+</span>
  </div>
</template>

<script>
export default {
  name: 'CountManager',
  props: {
    // 父组件传过来商品数量
    defaultNumber: {
      type:Number,
      default: 1
    }
  },
  data() {
    return {
      count: 1
    }
  },
  methods: {
    // 商品数量减少事件
    onLessCount: function() {
      if(this.count === 1) return
      this.count --
    }
  },
  watch: {
    // 监听父组件传过来的商品数量值，更新数量
    defaultNumber: function(newV) {
      this.count = newV
    },
    count: function(newV) {
      this.$emit('onChangeCount', newV)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
  .count-manager {
    display: flex;
    height: px2rem(20);
    span {
      display: inline-block;
      text-align: center;
      width: px2rem(30);
      font-weight: 500;
      color: #333;
      font-size: $infoSize;
    }
    &-less, &-add {
      border: px2rem(1) solid #eee;
      box-sizing: border-box;
      border-radius: px2rem(15);
    }
    &-count {
      font-size: $minInfoSize;
      background-color: $bgColor;
      margin: 0 px2rem(4);
      line-height: px2rem(20);
    }
    &-disabled {
      color: $hintColor;
    }
  }
</style>