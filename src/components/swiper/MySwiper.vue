<template>
<div class="swiper">
  <swiper :options="swiperOptions">
    <swiper-slide  v-for="item in swiperImg" :key="item.id">
      <img class="swiper-slide-img" :style="{ height: height }" :src="item.icon" alt="">
    </swiper-slide>
    <!-- 分页器 -->
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
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
        pagination: {
          // 分页器对应的元素
          el: '.swiper-pagination',
          // 分页器的样式
          type: 'bullets',
          // 给分类器内的元素添加类名
          bulletClass: 'custom-bullet-class'
        }
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
.swiper-pagination {
  bottom: px2rem(12);
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
</style>
