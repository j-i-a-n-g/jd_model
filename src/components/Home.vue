<template>
<div class="home" @scroll="onScrollHome" ref="home">
  <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
    <!-- 左侧插槽内容 -->
    <template v-slot:nav-left>
      <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
    </template>
    <!-- 中间插槽 -->
    <template v-slot:nav-center>
      <Search :bgColor="navBarCurrentSlotStyle.search?.bgColor"
      :hintColor="navBarCurrentSlotStyle.search?.hintColor" 
      :icon="navBarCurrentSlotStyle.search?.icon"></Search>
    </template>
    <!-- 右侧插槽 -->
    <template v-slot:nav-right>
      <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
    </template>
  </navigation-bar>
  <!-- 轮播图 -->
  <div class="home-swiper">
    <MySwiper :swiperImg="swiper" :height="SwiperHeight"></MySwiper>
  </div>
  <!-- 520活动布局  -->
  <Activity>
    <div class="activity-520">
      <img v-for="item in activityImg" :key="item.id" :src="item.icon" alt="">
    </div>
  </Activity>
  <!-- 京东功能选项组件 -->
  <ModeOptions />
  <!-- 秒杀专区 -->
  <Spike />
  <!-- 拼购节 -->
  <Activity>
    <div class="activity-pin-gou-jit">
      <img src="@img/haoHuoQiang.gif" alt="">
    </div>
  </Activity>
  <!-- 商品列表 -->
  <Goods :type="3"></Goods>
</div>
</template>

<script>
import MySwiper from './swiper/MySwiper.vue'
import Activity from './currency/Activity.vue'
import Spike from './currency/Spike.vue'
import ModeOptions from './currency/ModeOptions.vue'
import Goods from './currency/Goods.vue'
import { getSwiper, getActivity } from '@/api/home'
import NavigationBar from './NavigationBar.vue'
import Search from './currency/Search.vue'
export default {
 name: 'Home' ,
 data() {
  return {
    swiperImg: [],
    SwiperHeight: '184px',
    activityImg: [],
    // navBar 插槽样式，包括滑动和未滑动的样式
    navBarSlotStyle: {
      // 默认样式
      normal: {
        // 左侧插槽
        leftIcon: require('@img/more-white.svg'),
        // 中间插槽
        search: {
          bgColor: '#fff',
          hintColor: '#999',
          icon: require('@img/search.svg')
        },
        // 右侧插槽
        rightIcon: require('@img/message-white.svg')
      },
      // 高亮样式
        highlight: {
        // 左侧插槽
        leftIcon: require('@img/more.svg'),
        // 中间插槽
        search: {
          bgColor: '#d7d7d7',
          hintColor: '#fff',
          icon: require('@img/search-white.svg')
        },
        // 右侧插槽
        rightIcon: require('@img/message.svg')
      }
    },
    // navBar 当前使用的插槽样式
    navBarCurrentSlotStyle: {},
    // navBar 的定制样式
    navBarStyle: {
      position: 'fixed',
      backgroundColor: ''
    },
    // 记录页面的滚动值
    scrollTopValue: -1,
    // 锚点值
    ANCHOR_SCROLL_TOP: 160
  }
  },
  async created() {
    const { data } =  await getSwiper()
    this.swiperImg = data.list
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    const { data: activityData } = await getActivity()
    this.activityImg = activityData.list
  },
  activated(){
    this.$refs.home.scrollTop = this.scrollTopValue
  },
  methods: {
    onScrollHome($event) {
      // 获取当前页面滚动的距离
      this.scrollTopValue = $event.target.scrollTop
      // 计算navBar 背景颜色的透明度
      const opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP
      if ( opacity >= 1 ) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      // 根据透明比例设置navBar 的背景颜色
      this.navBarStyle.backgroundColor = `rgba(255,255,255,${opacity})`
    }
  },
  computed: {
    swiper: function() {
      const swiper = this.swiperImg.map(item => {
        return item.icon
      })
      return swiper
    }
  },
 components: {
    MySwiper,
    Activity,
    ModeOptions,
    Spike,
    Goods,
    NavigationBar,
    Search,
    MySwiper
}
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.home {
  width: 100%;
  height: 100%;
  background-color: bgColor;
  overflow: hidden;
  overflow-y: auto;
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
  .activity-pin-gou-jit {
    background-color: #fff;
    margin-top: $marginSize;
    img {
      width: 100%;
    }
  }
}
</style>
