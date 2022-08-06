<template>
<div class="shopping">
  <navigation-bar :pageName="pageName" :isShowBack="false"></navigation-bar>
  <!-- 购物车内容 -->
  <div class="shopping-content">
    <div class="shopping-content-list">
      <div class="shopping-content-list-item" v-for="(item, index) in shoppingList" :key="index">
      <!-- 是否选中 -->
        <img class="shopping-content-list-item-check" :src="chooseImg(item.isCheck)" @click="onChangeShoppingState(item)" alt="">
        <!-- 商品图片 -->
        <img class="shopping-content-list-item-img" :src="item.img" alt="">
        <!-- 商品描述 -->
        <div class="shopping-content-list-item-desc">
          <p class="shopping-content-list-item-desc-name text-line-2">
            <!-- 是否直营 -->
            
            <Direct v-if="item.isDirect"></Direct>
            {{item.name}}
          </p>
          <div class="shopping-content-list-item-desc-data">
            <!-- 商品价格 -->
            <p class="shopping-content-list-item-desc-data-price">￥{{item.price | priceValue}}</p>
            <!-- 商品数量的控制组件 -->
            <CountManager :defaultNumber="item.buyCount" @onChangeCount="onChangeCount(arguments, item, index)"></CountManager>
          </div>
        </div>
      </div>
    </div>

    <!-- 统计 -->
    <div class="shopping-content-total">
      <div class="shopping-content-total-check">
        <img :src="chooseImg(totalData.chooseAll)" alt="" @click="onChangeAllShoppingState">
        <p>全选</p>
      </div>

      <!-- 总价格 -->
      <div class="shopping-content-total-price">
        <p class="shopping-content-total-price-total">合计：<span>￥{{totalData.totalPrice | priceValue}}</span></p>
        <p class="shopping-content-total-price-all">总额：
          <span>￥{{totalData.finallyPrice | priceValue}}</span>
          &nbsp;&nbsp;
          立减<span>￥0</span>
        </p>
      </div>
      <!-- 结算 -->
      <div class="shopping-content-total-commit">
        去结算({{totalData.allShoppingCount}})
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import store from '@/store'
import Direct from './currency/GoodsComponents/Direct.vue'
import CountManager from './currency/GoodsComponents/CountManager.vue'
export default {
 name: 'Shopping',
 data() {
  return {
    pageName: '购物车',
    // 购物车商品列表
    shoppingList: store.state.shoppingList,
    totalData: {
      // 是否全选：
      chooseAll: false,
      // 未减价的价格
      totalPrice: 0,
      // 最后的价格
      finallyPrice: 0,
      // 商品的合计数量
      allShoppingCount: 0
    }
  }
 },
 updated() {
  console.log(this.shoppingList);
 },
 activated() {
   this.computedAllShopping()
 },
 methods: {
  // 传入状态选择勾选
  chooseImg(boolean) {
    return boolean ? require('@img/check.svg') : require('@img/no-check.svg')
  },
  // 商品数量手动增减时，触发的事件
  onChangeCount: function($arguments, item, index) {
    const count = $arguments[0]
    const data = {
      index: index,
      newV: count
    }
    // 修改商品对应数量
    store.commit('changeBuyCount', data)
    if(item.isCheck) {
      this.computedAllShopping()
    }
  },
  // 监听单个商品选中状态的点击事件
  onChangeShoppingState(item) {
    item.isCheck = !item.isCheck
    this.computedAllShopping()
  },
  // 修改所有商品选中状态的点击事件
  onChangeAllShoppingState() {
    this.totalData.chooseAll = !this.totalData.chooseAll
    this.shoppingList.forEach(item => {
      item.isCheck = this.totalData.chooseAll
    })
    this.computedAllShopping()
  },
  // 计算商品的合计数量与合计金额
  computedAllShopping() {
    // 每次调用该方法时，需对数据清零处理
    this.totalData = {
      chooseAll: true,
      totalPrice: 0,
      finallyPrice: 0,
      allShoppingCount: 0
    }
    this.shoppingList.forEach(item => {
      if(item.isCheck) {
        this.totalData.allShoppingCount += item.buyCount
        this.totalData.totalPrice += item.buyCount * item.price
        this.totalData.finallyPrice = this.totalData.totalPrice
      } else {
        this.totalData.chooseAll = false
      }
    })
  }
 },
 components: {
    NavigationBar,
    Direct,
    CountManager
}
}
</script>


  NavigationBar<style lang="scss" scoped>
  @import '@css/style.scss';
.shopping {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  &-content {
    background-color: $bgColor;
    border-top: px2rem(1) solid $lineColor;
    height: 93%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // 商品列表
    &-list {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      &-item {
        background-color: #fff;
        padding: $marginSize;
        display: flex;
        border-bottom: px2rem(1) solid $lineColor;
        &-check {
          width: $checkSize;
          align-self: center;
          padding: px2rem(6);
        }
        &-img {
          width: $listGoodsImgSize;
          height: $listGoodsImgSize;

        }
        &-desc {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 $marginSize;
          &-name {
            font-size: $infoSize;
            line-height: px2rem(18);
          }
          &-data {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: $marginSize;
            &-price {
              font-size: $titleSize;
              color: $mainColor;
              font-weight: 500;
            }
          }
        }
      }
    }
    // 总计
    &-total {
      height: px2rem(56);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: #fff;
      border-top: px2rem(1) solid $lineColor;

      &-check {
        display: flex;
        align-items:center ;
        margin: 0 $marginSize;

        img {
          width: $checkSize;
          height: $checkSize;
          padding: px2rem(6);
        }
         p {
          font-size: $infoSize;
         }
      }

      &-price {
        flex-grow: 2;
        display: flex;
        flex-direction: column;

        &-total {
          font-size: px2rem(16);
          margin-bottom: px2rem(6);

          span {
            font-weight: bold;
          }
        }

        &-all {
          font-size: $minInfoSize;
          span {
            font-weight: bold;
          }
        }
      }

      &-commit {
        width: px2rem(120);
        height: 100%;
        font-size: $titleSize;
        background-color: $mainColor;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
