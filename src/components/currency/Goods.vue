<template>
  <div class="goods goods-waterfall" :style="{height: parentHeight}">
    <div class="goods-item goods-waterfall-item" v-for="(item, index) in goodsList" :key="index" :style="goodsItemStyle[index]" ref="goodsItem">
    <!-- 图片 -->
    <img class="goods-item-img" :style="heightArr[index]" :src="item.img" alt="">
    <!-- 商品详情描述 -->
    <div class="goods-item-desc">
      <p class="goods-item-desc-name text-line-2">
        <!-- 直营店 -->
        <Direct v-if="item.isDirect"></Direct>
        <Empty v-if="!item.isHave"></Empty>
        <!-- 库存情况 -->
        {{item.name}}
      </p>
      <div class="goods-item-desc-data">
        <p class="goods-item-desc-data-price">￥{{item.price | priceValue}}</p>
        <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Direct from './GoodsComponents/Direct.vue'
import Empty from './GoodsComponents/Empty.vue'
import { getGoodsList } from '@/api/home'
export default {
  data() {
    return {
      // 商品信息列表
      goodsList: [],
      minHeight:178,
      maxHeight:230,
      heightArr: [],
      ITEM_MARGIN_SIZE: 8,
      goodsItemStyle: [],
      parentHeight: 0
    }
  },
  async created() {
    const { data } = await getGoodsList()
    this.goodsList = data.list
    console.log(data.list)
    this.getImgHeight()
    this.$nextTick(() => {
      this.setWaterfall()
    })
  },
  methods: {
    getImgHeight: function() {
      this.goodsList.forEach(() => {
         const imgHeight = Math.floor(Math.random() * (this.maxHeight - this.minHeight) + this.minHeight) + 'px'
         this.heightArr.push({height: imgHeight})
      })
    },
    //  瀑布流布局
    setWaterfall() {
      // 通过ref获取所有的 item 元素
      let $goodsItems = this.$refs.goodsItem
      if(!$goodsItems) {
        return
      }
      let leftHeight = 0
      let rightHeight = 0
      // item 样式
      let goodsItemStyle = {}
      // 遍历所有 item 元素， 获取其总高度
      $goodsItems.forEach($el => {
        const elHeight = $el.offsetHeight + this.ITEM_MARGIN_SIZE;
        // 对比左右两侧距离顶部的高度
        if (leftHeight <= rightHeight) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeight + 'px'
          }
          leftHeight += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeight + 'px'
          }
          rightHeight += elHeight
        }
        // 保存计算出来的样式，放置到 item 上
        this.goodsItemStyle.push(goodsItemStyle)
      })
      this.parentHeight = (leftHeight >= rightHeight ? leftHeight : rightHeight) + 'px'
    }
  },
  components: {
    Direct,
    Empty,
    Empty
}
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods {
  background-color: $bgColor;
  &-item {
    background-color: #fff;
    padding: $marginSize;
    box-sizing: border-box;
    &-desc {
      width: 100%;
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
      &-volume {
        font-size: $infoSize;
        color: $hintColor;
      }
      }
    }
  }
}
.goods-waterfall {
  position: relative;
  margin: $marginSize;
  &-item {
    position: absolute;
    width: 49%;
    border-radius: $radiusSize;
    margin-top: $marginSize;
  }
  .goods-item-img {
    width: 100%;
  }
}
</style>