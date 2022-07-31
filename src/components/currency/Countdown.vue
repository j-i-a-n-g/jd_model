<template>
  <div class="countdown">
    <span class="countdown-item">{{endHours}}点场</span>
    <span class="countdown-surplus">{{surplus}}</span>
  </div>
</template>

<script>
export default {
  props: {
    endHours: {
      type: String,
      require: true,
      default:0
    }
  },
  data() {
    return {
      // 展示活动状态
      surplus: '',
      // 距离活动开始时间的秒数
      diffSeconds: 0,
      // 定时器
      timer: null
    }
  },
  created() {
    this.computedSurplusTime()
  },
  methods: {
    // 计算展示内容
    computedSurplusTime: function() {
      if(this.timer) {
        clearInterval(timer)
      }
      const nowDate = new Date()
      if (nowDate.getHours() > this.endHours) {
        return this.surplus = '活动已结束'
      }
      if (nowDate.getHours() == this.endHours) {
        return this.surplus = '活动进行中'
      }
      // 当前时间未到活动时间的时候，展示倒计时
      const diffHours = this.formatTime(this.endHours - nowDate.getHours() - 1)
      const diffMinutes = this.formatTime(60 - nowDate.getMinutes() - 1)
      const diffSeconds = this.formatTime(60 - nowDate.getSeconds())
      this.diffSeconds = diffHours * 3600 + diffMinutes * 60 + diffSeconds
      this.timer = setInterval(() => {
        this.diffSeconds -= 1
      }, 1000)
    },
    // 处理时间格式
    formatTime: function(value) {
      if (value >= 10) {
        return value
      }
      return "0" + value
    }
  },
  watch: {
    diffSeconds: function (newValue) {
      const hh = this.formatTime(Math.floor(newValue / 3600))
      const mm = this.formatTime(Math.floor(newValue / 60) % 60)
      const ss = this.formatTime(newValue % 60)
      this.surplus = `${hh}:${mm}:${ss}`
      if (this.diffSeconds === 0) {
          this.surplus = '活动进行中'
          clearInterval(timer)
      }
    },
    // 监听 活动开始时间的变化
    endHours: function (newValue) {
      this.computedSurplusTime()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/style.scss';
.countdown {
  display: inline-block;
  font-size: $infoSize;
  margin-left: $marginSize;
  span {
    display: inline-block;
    padding: px2rem(2) px2rem(4);
  }
  &-item {
    background-color: $mainColor;
    border-top-left-radius: px2rem(4);
    border-bottom-left-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: white;
  }
  &-surplus {
    background-color: #fff;
    border-top-right-radius: px2rem(4);
    border-bottom-right-radius: px2rem(4);
    border: px2rem(1) solid $mainColor;
    color: $mainColor;
  }
}
</style>