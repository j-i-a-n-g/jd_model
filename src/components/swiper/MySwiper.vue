<template>
<div class="swiper">
  <swiper :options="swiperOptions">
    <swiper-slide  v-for="(item, index) in swiperImg" :key="index">
      <img class="swiper-slide-img" :style="{ height: height }" :src="item" alt="">
    </swiper-slide>
      <Skeleton :height="height" width="100%"></Skeleton>
    <!-- 分页器 -->
    <template v-slot:pagination>
      <div class="swiper-pagination" :class="swiperOptions.pagination.bulletClass"></div>
    </template>
  </swiper>
</div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    // 通过父组件传递过来的 slide 高度
    height: {
      type: String,
      default: 'auto'
    },
    // 数据源
    swiperImg: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    },
    /**
     * 1: 圆点
     * 2：数字
     */
    paginationStyle: {
      type: String,
      default: '1'
    }
  },
  data() {
    return {
      // swiper配置
      swiperOptions: {
        // 自动滚动
        autoplay: true,
        // swiper高度跟随 silde高度变化
        autoHeight: true,
        // 分页器设置效果
        pagination: {}
      }
    }
  },
  created(){
    this.initPaginationStyle()
  },
  methods: {
    // 根据不同的 type 初始化分页器的样式
    initPaginationStyle() {
      switch (this.paginationStyle) {
        // 圆点分页器
        case '1':
          this.swiperOptions.pagination = {
            // 分页器对应的元素
            el: '.swiper-pagination',
            // 分页器的样式
            type: 'bullets',
            // 给分类器内的元素添加类名
            bulletClass: 'custom-bullet-class'
        }
          break;
          // 数字分页器
        case '2':
          this.swiperOptions.pagination = {
            // 分页器对应的元素
            el: '.swiper-pagination',
            // 分页器的样式
            type: 'fraction',
            // 给分类器内的元素添加类名
            bulletClass: 'custom-bullet-class'
        }
          break;
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
@import 'swiper/dist/css/swiper.css';
@import '@css/style.scss';
.swiper-slide-img {
  width: 100%;
}
.swiper-pagination {
  bottom: px2rem(12);
  font-size: $titleSize;
  font-weight: bold;
  // 圆点分页器
  .custom-bullet-class {
  box-sizing: border-box;
  border-radius: 100%;
  height: px2rem(6);
  width:  px2rem(6);
  border: px2rem(1) solid #fff;
  margin: 0 px2rem(4);
  display: inline-block;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background-color: #fff;
}
}
  // 数字分页器
  .swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    font-size: $infoSize;
    background-color: rgba(0,0,0,.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    bottom: px2rem(32);
    color: #fff;
  } 
</style>
