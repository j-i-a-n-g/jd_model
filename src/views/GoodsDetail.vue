<template>
  <div class="goods-detail">
    <!-- 置顶栏 -->
    <NavigationBar :isShowBack="false" :navBarStyle="navBarStyle" :style="navBarChange">
      <template v-slot:nav-left>
        <div class="goods-detail-back" @click="RouterBackToGoodsList">
        <!-- 随着页面内容的滚动，显示不一样的图片 -->
          <img src="@img/back-2.svg" alt="" :style="{opacity: leftIconStyle}">
          <img src="@img/back-white.svg" alt="" :style="{opacity: behindLeftIconStyle}">
        </div>
      </template>
      <template v-slot:nav-center>
        <p class="goods-detail-title" :style="{opacity: behindLeftIconStyle}">商品详情</p>
      </template>
    </NavigationBar>
    <!-- 滚动内容区域 -->
    <div class="goods-detail-content">
    <Parallax @onScrollChange="onScrollChange">
    <!-- 轮播图 -->
      <template v-slot:parallax-slow>
      <MySwiper :paginationStyle="'2'" :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImg="goodsData.swiperImgs"></MySwiper>
      </template>
      <!-- 内容 -->
      <template v-slot:parallax-normal>
      <div class="goods-detail-content-desc">
        <div class="goods-detail-content-desc-item">
          <p class="goods-detail-content-desc-item-price">￥{{ goodsData.price | priceValue }}</p>
          <p class="goods-detail-content-desc-item-name">
            <Direct v-if="goodsData.isDirect"></Direct>
            {{ goodsData.name }}
          </p>
        </div>

        <div class="goods-detail-content-desc-item">
          <p class="goods-detail-content-desc-item-select">
            已选 
            <span class="single-row-text text-line-1">{{ goodsData.name }}</span>
          </p>
          <div class="goods-detail-content-desc-item-support">
            <ul class="goods-detail-content-desc-item-support-list">
              <li class="goods-detail-content-desc-item-support-list-item" v-for="(item, index) in supportDatas" :key="index">
                <img src="@img/support.svg" alt="" srcset="" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
  
        <div class="goods-detail-content-desc-detail">
            <img v-for="(item, index) in goodsData.detailImgs" :key="index" :src="item" alt="" srcset="" />
        </div>
      </div>
      </template>
      </Parallax>
    </div>
      <!-- 加入购物车，立即购买 -->
    <div class="goods-detail-buy z-index-3">
      <div class="goods-detail-buy-add">加入购物车</div>
      <div class="goods-detail-buy-now" @click="onRouterToBuy">立即购买</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue'
import MySwiper from '@/components/swiper/MySwiper.vue'
import Direct from '@/components/currency/GoodsComponents/Direct.vue'
import Parallax from '@/components/Parallax/Parallax.vue'
import { getGoodsDetail } from '@/api/home'
export default {
  name: 'GoodsDetail',
  components: { NavigationBar, MySwiper, Direct, Parallax },
  data() {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      navBarStyle: {
        backgroundColor: '',
        position: 'fixed'
      },
      goodsData: {},
      // 附加服务
      supportDatas: [
        '可配送服务',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ],
      // 内容滚动距离
      scollTop: 0,
      // 内容滚动距离的锚点
      DETAIL_ANTHOR_POINT: 310,
    }
  },
  async created() {
    const { data } = await getGoodsDetail({
        goodsId: this.$route.query.goodsId
    })
    this.goodsData = data.goodsData
  },
  methods: {
    // 后退页面
    RouterBackToGoodsList() {
      this.$router.go(-1)
    },
    // 跳转到立即购买页面
    onRouterToBuy() {
      this.$router.push({
        name: 'Buy',
        params: {
          routeType: 'push'
        },
        query: {
          goodsId: this.$route.query.goodsId
        }
      })
    },
    // 页面内容部分的滚动事件
    onScrollChange(scollTop) {
     if (this.scollTop >= this.DETAIL_ANTHOR_POINT ) {
      this.scollTop = this.DETAIL_ANTHOR_POINT
     }
     this.scollTop = scollTop
    }
  },
  computed: {
    // 滚动过程中左侧后退按钮的样式变化
    leftIconStyle: function() {
      return 1 - this.scollTop / this.DETAIL_ANTHOR_POINT
    },
    // 滚动完成后另一个左侧后退按钮的显示
    behindLeftIconStyle: function() {
      return this.scollTop / this.DETAIL_ANTHOR_POINT
    },
    // 滑动过程中置顶栏的样式变化
    navBarChange: function() {
      return {
        backgroundColor: 'rgba(216, 30, 6, '+ (this.scollTop / this.DETAIL_ANTHOR_POINT) +' )'
      }
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-detail {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: absolute;
  &-back {
    position: relative;
    width: 100%;
    img {
      position: absolute;
      left: 0;
      top: 50%;
      margin-top: px2rem(-13);
    }
  }
  &-title {
      flex-grow: 1;
      font-size: $titleSize;
      text-align: center;
      color: #fff;
      font-weight: cold;
  }

  &-nav-title {
    width: 100%;
    height: 100%;
    font-size: $titleSize;
    font-weight: bold;
    text-align: center;
    color: white;
  }

  &-content {
    height: 100%;
    overflow: hidden;
    &-desc {
      width: 100%;
      background-color: $bgColor;
      box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
      &-item {
        background-color: white;
        padding: $marginSize;
        margin-bottom: $marginSize;
        // 价格
        &-price {
          font-size: px2rem(20);
          color: $mainColor;
          font-weight: 500;
        }
        // 名称
        &-name {
          margin-top: $marginSize;
          font-size: $titleSize;
          font-weight: 500;
          line-height: px2rem(20);

          &-hint {
            color: $textHintColor;
          }
        }
        // 已选商品
        &-select {
          font-size: $infoSize;
          color: $textHintColor;
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: px2rem(1) solid $lineColor;

          span {
            color: $textColor;
            font-size: $titleSize;
            font-weight: bolder;
            margin-left: px2rem(4);
            width: 80%;
          }
        }
        // 可选服务
        &-support {
          margin-top: $marginSize;

          &-list {
            display: flex;
            flex-wrap: wrap;

            &-item {
              display: flex;
              align-items: center;
              padding: px2rem(6) 0;
              margin-right: $marginSize;

              img {
                width: px2rem(12);
                margin-right: px2rem(4);
              }

              span {
                font-size: $minInfoSize;
                color: $textHintColor;
              }
            }
          }
        }
      }

      &-detail {
        img {
          width: 100%;
        }
      }
    }
  }
  // 底栏立即购买和购物车
  &-buy {
    background-color: white;
    border-top: px2rem(1) solid $lineColor;
    width: 100%;
    height: px2rem(46);
    line-height: px2rem(46);
    text-align: right;
    div {
      display: inline-block;
      width: px2rem(100);
      text-align: center;
      font-size: $infoSize;
      color: white;
    }

    &-add {
      background-color: $mainColor;
    }

    &-now {
      background-color: darkgoldenrod;
    }
  }
}
</style>