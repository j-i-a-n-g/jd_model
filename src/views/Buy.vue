<template>
  <div class="buy">
    <!-- 顶部栏 -->
    <NavigationBar :pageName="'立即购买'" @onLeftClick="onLeftClick">
    </NavigationBar>
    <!-- 中间内容模块 -->
    <div class="buy-content">
      <!-- 商品信息模块 -->
      <div class="buy-content-goods">
        <!-- 商品图片 -->
        <img class="buy-content-goods-img" :src="goodsData.img" alt="">
        <!-- 商品描述 -->
        <div class="buy-content-goods-desc">
          <p class="buy-content-goods-desc-name">{{goodsData.name}}</p>
          <p class="buy-content-goods-desc-price">￥{{goodsData.price | priceValue}}</p>
        </div>
      </div>
      <!-- 支付方式模块 -->
      <ul class="buy-content-list">
        <li class="buy-content-list-item" v-for="(item, index) in payment" :key="index" @click="choosePayment(item)">
        <!-- 支付方式的图标 -->
        <img class="buy-content-list-item-icon" :src="item.icon" alt="">
        <!-- 支付方式的描述 -->
        <div class="buy-content-list-item-desc">
          <p class="buy-content-list-item-desc-name">{{item.name}}</p>
          <p class="buy-content-list-item-desc-desc">{{item.desc}}</p>
        </div>
        <!-- 支付方式是否选中的图标 -->
        <img class="buy-content-list-item-choose" :src="beChoosePayment(item.id === UserChoosePayment.id)" alt="">
        </li>
      </ul>
    </div>
    <!-- 底部立即购买按钮 -->
    <div class="buy-button page-commit">立即购买</div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import { getGoodsDetail } from '@/api/home'
export default {
  name: "Buy",
  components: { NavigationBar },
  data() {
    return {
      // 商品详细信息
      goodsData: {},
      // 支付功能
      payment: [
        {
          id: '1',
          name: '支付宝支付',
          desc: '数亿用户都在用，安全可信托',
          icon: require('@img/alipay.svg')
        },
        {
          id: '2',
          name: '微信支付',
          desc: '亿万用户的选择，更快速更安全',
          icon: require('@img/weichat.png')
        }
      ],
      // 用户选择的支付方式
      UserChoosePayment: {}
      // 
    }
  },
  async created() {
    this.UserChoosePayment = this.payment[0]
    const { data } = await getGoodsDetail({
      goodsId: this.$route.query.goodsId
    })
    this.goodsData = data.goodsData
  },
  methods: {
    // 点击返回按钮，回退到上一个页面
    onLeftClick() {
      this.$router.go(-1)
    },
    // 被选中的支付方式和对应显示的图标
    beChoosePayment(boolean) {
      return boolean ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    // 切换支付方式
    choosePayment(item) {
      this.UserChoosePayment = item
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.buy {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  &-content {
    height: 100%;
    overflow: hidden;
    // 商品
    &-goods {
      background-color: #fff;
      padding: $marginSize;
      display: flex;
      border-bottom: px2rem(1) solid $lineColor;
      border-top: px2rem(1) solid $lineColor;
      margin-top: $marginSize;
      &-img {
        width: px2rem(100);
        height: px2rem(100);
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
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }
    // 支付方式
    &-list {
      margin-top: $marginSize;
      &-item {
        display: flex;
        background-color: #fff;
        border-bottom: px2rem(1) solid $lineColor;
        padding: $marginSize;
        align-items: center;
        &-icon {
          height: px2rem(30);
        }
        &-desc {
          margin-left: px2rem(12);
          flex-grow: 1;
          &-name {
            font-size: $infoSize;
          }
          &-desc {
            font-size: $minInfoSize;
            margin-top: px2rem(6);
            color: $lineColor;
          }
        }
        &-choose {
          width: px2rem(16);
          height: px2rem(16);
        }
      }
    }
  }
  // 立即支付按钮
  .buy-button {
    position: absolute;
    bottom: px2rem(52);
    font-size: $titleSize;
  }
}
</style>