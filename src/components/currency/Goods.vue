<template>
  <div class="goods" :class="goodsStyle" :style="{height: parentHeight}">
    <div class="goods-item" :class="goodsStyleItem" v-for="(item, index) in sortGoodsSource" :key="index" :style="goodsItemStyle[index]" ref="goodsItem">
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
  props:{
    type: {
      type: Number,
      default: 1
    },
    /**
     * 排序规则：
     * 1：默认
     * 1-2：价格由高到低
     * 1-3：销量由高到低
     * 2：有货优先
     * 3：直营优先
     */
    optionsDatasId: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      // 商品信息列表
      goodsList: [],
      minHeight:178,
      maxHeight:230,
      // 随机生成的图片高度数组
      heightArr: [],
      ITEM_MARGIN_SIZE: 8,
      // 每个商品选项卡的绝对定位相对位置
      goodsItemStyle: [],
      // 组件的总高度
      parentHeight: '100%',
      // 根据不同的布局方式使用不同的样式
      goodsStyle: 'goods-list-arrange',
      goodsStyleItem: 'goods-list-arrange-item',
      // 布局样式的类名集合
      goodsClassName: [
        // 列表布局
        {
          goodsStyle: 'goods-list-arrange',
          goodsStyleItem: 'goods-list-arrange-item'
        },
          // 方格排列
        {
          goodsStyle: 'goods-pane-arrange',
          goodsStyleItem: 'goods-pane-arrange-item'
        },
          // 瀑布流
        {
          goodsStyle: 'goods-waterfall',
          goodsStyleItem: 'goods-waterfall-item'
        }
      ],
      // 用做根据属性进行排序的数据源
      sortGoodsSource: [],
    }
  },
  async created() {
    const { data } = await getGoodsList()
    this.goodsList = data.list
    this.initStyle()
    console.log(data.list)
    this.setSortGoodsListById()
  },
  methods: {
    // 初始化布局页面
    initStyle() {
      switch (this.type) {
        case 1:
          this.heightArr = []
          this.goodsItemStyle = []
          this.goodsStyle = 'goods-list-arrange'
          this.goodsStyleItem = 'goods-list-arrange-item'
          break
        case 2:
          this.goodsStyle = 'goods-pane-arrange'
          this.goodsStyleItem = 'goods-pane-arrange-item'
          break
        case 3:
          this.goodsStyle = 'goods-waterfall'
          this.goodsStyleItem = 'goods-waterfall-item'
          this.getImgHeight()
          this.$nextTick(() => {
            this.setWaterfall()
          })
          break
      }
    },
    // 获取图片的随机高度数组
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
    },
    // 设置排序的方法
    setSortGoodsListById() {
       switch (this.optionsDatasId) {
        // 默认排序
        case '1':
          // 对源数据进行深拷贝，后面重新排序时不会修改原数组
          this.sortGoodsSource = this.goodsList.slice(0)
          break;
        case '1-2':
          // 价格由高到低排序
          this.getSortGoodsList('price')
          break;
        case '1-3':
          // 销量由高到低排序
          this.getSortGoodsList('volume')
          break;
        case '2':
          // 有货优先
          this.getSortGoodsList('isHave')
          break;
        case '3':
          // 直营优先
          this.getSortGoodsList('isDirect')
          break;
      }
    },
    // 数组排序
    getSortGoodsList(key) {
      this.sortGoodsSource.sort((val1, val2) => {
        let v1 = val1[key]
        let v2 = val2[key]
        // 判断传进来的key是不是布尔值 有货和直营的排序
        if (typeof v1 === 'boolean') {
          // 如果 v1 的值是 true，则排序不变
          if (v1) {
            return -1
          }
          // 如果 v2 的值是true，则排序靠前
          if (v2) {
            return 1
          }
          // v1 v2 都是false, 排序不变
          return 0
        }
        // 价格和销量的排序
        if(parseFloat(v1) >= parseFloat(v2)) {
          return -1
        } else {
          return 1
        }
      })
    }
  },
  watch: {
    type: function() {
      this.initStyle()
    },
    // 监听排序方式对应的Id变化
    optionsDatasId: function() {
      // console.log(this.optionsDatasId)
      this.setSortGoodsListById()
    },
    // 监听列表数据变化，刷新页面
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
// 列表排列样式
.goods-list-arrange {
  display: flex;
  flex-direction: column;
  margin-top: $marginSize;
  &-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $lineColor;
    .goods-item-img {
      width: px2rem(120);
      height: px2rem(120);
    }
  }
}
// 方格排列样式
.goods-pane-arrange {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  &-item {
    width: 48%;
    border-radius: $radiusSize;
    margin-top: $marginSize;
  }
  .goods-item-img {
    width: 100%;
  }
}
// 瀑布流排列样式
.goods-waterfall {
  position: relative;
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