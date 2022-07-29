<template>
<div class="home">
  <!-- 轮播图 -->
  <div class="home-swiper">
    <my-swiper :swiperImg="swiperImg" :height="SwiperHeight"></my-swiper>
  </div>
  <!-- 520活动布局  -->
  <Activity>
    <div class="activity-520">
      <img v-for="item in activityImg" :key="item.id" :src="item.icon" alt="">
    </div>
  </Activity>
  <!-- 京东功能选项组件 -->
  <ModeOptions />
</div>
</template>

<script>
import MySwiper from './swiper/MySwiper.vue'
import Activity from './currency/Activity.vue'
import ModeOptions from './currency/ModeOptions.vue'
import { getSwiper, getActivity } from '@/api/home'
export default {
 name: 'Home' ,
 data() {
  return {
    swiperImg: [],
    SwiperHeight: '184px',
    activityImg: []
  }
  },
  async created() {
    const { data } =  await getSwiper()
    this.swiperImg = data.list
    const { data: activityData } = await getActivity()
    this.activityImg = activityData.list
  },
 components: {
    MySwiper,
    Activity,
    ModeOptions
}
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.home {
  width: 100%;
  height: 100%;
  background-color: bgColor;
  // &-swiper {
  //   width: 100%;
  //   height: 100%;
  // }
  .activity-520 {
    margin-top: px2rem(-8);
    border-top-left-radius: px2rem(8);
    border-top-right-radius: px2rem(8);
    img {
      display: inline-block;
      width: 33.33%;
    }
  }
}
</style>
