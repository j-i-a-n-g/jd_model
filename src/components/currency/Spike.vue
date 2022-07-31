<template>
<div class="spike">
  <div class="spike-item">
    <p class="spike-item-title">京东秒杀</p>
    <div class="spike-item-count-down">
      <!-- 倒计时 -->
      <Countdown :endHours="endHours" />
    </div>
  </div>
  <div class="spike-content">
      <div class="spike-content-goods" v-for="item in spikeGoods" :key="item.id">
    <img class="spike-content-goods-image" :src="item.icon" alt="">
    <h4 class="spike-content-goods-price">{{item.price | priceValue}}</h4>
    <p class="spike-content-goods-old-price">{{item.oldPrice |priceValue}}</p>
  </div>
  </div>
</div>
</template>

<script>
import { getSpike } from '@/api/home'
import Countdown from './Countdown.vue'
export default {
  data() {
    return {
      endHours: '16',
      spikeGoods: []
    }
  },
  async created() {
    const { data } = await getSpike()
    this.spikeGoods = data.list
  },
  components: {
    Countdown
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.spike {
  background-color: #fff;
  border-radius: $radiusSize;
  margin: $marginSize;
  &-item {
    display: flex;
    padding: $marginSize;

    &-title {
      font-size: $infoSize;
      display: inline-block;
    }
  }
  &-content {
    padding: $marginSize 0;
    display: flex;
    overflow: hidden;
    overflow-x: scroll;

    &-goods {
      padding: 0 px2rem(12);
      text-align: center;
      &-image {
        width: px2rem(66);
        height: px2rem(66);
      }
      &-price {
        color: $mainColor;
        font-size: $titleSize;
        margin-top: px2rem(4);
      }
      &-old-price {
        color: $hintColor;
        font-size: $infoSize;
        margin-top: px2rem(6);
        text-decoration: line-through;
      }
    }
  }
}
</style>
