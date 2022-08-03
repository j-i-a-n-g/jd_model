<template>
<div class="mode-options">
  <div class="mode-options-item" v-for="item in dataSource" :key="item.id" @click="goGoodsList">
    <img class="mode-options-item-icon" :src="item.icon" alt="">
    <p class="mode-options-item-title">{{item.title}}</p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      dataSource: [
        {
          id: 1,
          icon: require('@img/jingDongChaoShi.png'),
          title: '小江超市'
        },
        {
          id: 2,
          icon: require('@img/jingDongChaoShi.png'),
          title: '海电超市'
        },
        {
          id: 3,
          icon: require('@img/jingDongFuShi.png'),
          title: '小江服饰'
        },
        {
          id: 4,
          icon: require('@img/jingDongChaoShi.png'),
          title: '小江生鲜'
        },
        {
          id: 5,
          icon: require('@img/jingDongDaoJia.png'),
          title: '小江到家'
        },
        {
          id: 6,
          icon: require('@img/jingDongChaoShi.png'),
          title: '充值会员'
        },
        {
          id: 7,
          icon: require('@img/jingDongChaoShi.png'),
          title: '9.9元购'
        },
        {
          id: 8,
          icon: require('@img/jingDongChaoShi.png'),
          title: '领券'
        },
        {
          id: 9,
          icon: require('@img/jingDongChaoShi.png'),
          title: '赚钱'
        },
        {
          id: 10,
          icon: require('@img/jingDongChaoShi.png'),
          title: '全部'
        },
      ]
    }
  },
  methods: {
    goGoodsList() {
      this.$router.push('/goodslist')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.mode-options {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  padding-bottom: px2rem(14);
  &-item {
    width: 20%;
    text-align: center;
    margin-top: px2rem(10);
    &-icon {
      width: px2rem(40);
      height: px2rem(40);
    }
    &-title {
      font-size: $minInfoSize;
      margin-top: px2rem(5);
    }
  }
}
</style>
