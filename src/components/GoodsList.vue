<template>
<!-- 
  关于筛选排序说明
  1. 通过判断 GoodsOptions 里的数据源的 id 来确定排序方式

-->
  <div class="goods-list">
    <navigation-bar @onLeftClick="onBackHome" :pageName="'商品列表'">
    <template v-slot:nav-right>
      <img :src="showType.icon" @click="changeShowType">
    </template>
    </navigation-bar>
    <div class="goods-list-content">
      <GoodsOptions @updateId="onUpdataId"></GoodsOptions>
      <Goods class="goods" :type="showType.type" :optionsDatasId="sortType"></Goods>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import GoodsOptions from './currency/GoodsListComponents/GoodsOptions.vue'
import Goods from './currency/Goods.vue'
export default {
  name: 'GoodsList',
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
},
  data() {
  return {
    // 列表展示形式数据源
    goodsShowDate: [
      {
        // 列表展示
        type: 1,
        icon: require('@img/list-type.svg')
      },
      {
        // 网格布局
        type: 2,
        icon: require('@img/grid-type.svg')
      },
      {
        type: 3,
        icon: require('@img/waterfall-type.svg')
      }
    ],
    // 要展示的商品布局和右上角图标
    showType: {},
    // 接收子组件 GoodsOptions 传进来的id
    sortType: '1'
  }
},
created() {
  this.showType = this.goodsShowDate[0]
},
methods: {
  onBackHome() {
    this.$router.go(-1)
  },
  changeShowType() {
    if(this.showType.type === 1) {
      this.showType = this.goodsShowDate[1]
    } else if(this.showType.type === 2) {
      this.showType = this.goodsShowDate[2]
    } else {
      this.showType = this.goodsShowDate[0]
    }
  },
  // 当 GoodsOptions 里的筛选项发生改变时，通过传进来的id
  onUpdataId(id) {
    this.sortType = id
  }
}
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .goods {
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>