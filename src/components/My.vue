<template>
<div class="my">
  <navigation-bar :pageName="pageName" :isShowBack="false"></navigation-bar>
  <div class="my-content">
      <!-- 头像和登录/注册入口 -->
    <div class="my-content-enter">
      <div class="my-content-enter-avatar" @click="routerToLogin">
        <img src="@img/avater.png" alt="">
        <span>{{$store.state.username ? $store.state.username : '登录/注册'}}</span>
      </div>
    </div>
    <ul class="my-content-list">
      <li v-for="(item, index) in MyList" :key="index">
        <p>{{item}}</p>
        <span><img src="@img/back.svg" alt=""></span>
      </li>
    </ul>
  <div class="login-content-logout page-commit" v-if="$store.state.username" @click="onLogoutClick">退出登录</div>
  </div>
</div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
export default {
 name: 'My' ,
 data() {
  return {
    MyList: [
      '全部订单',
      '我的预约',
      '应用推荐',
      '用户福利'
    ],
    pageName: '个人中心'
  }
 },
 methods: {
   routerToLogin: function() {
    this.$router.push({
      name: 'Login',
      params: {
        routeType: 'push'
      }
    })
   },
  //  退出登录
  onLogoutClick: function() {
    if (window.andriodJSBridge) {
      
    } else if (window.webkit) {

    }
  },
  //  安卓设备退出登录的方法
  onAndriodToLogout: function() {
    let result = window.andriodJSBridge.logout()
    this.onLogoutCallback(result)
  },
  // IOS设备退出登录的方法
  onIOSToLogout: function() {
    window.logoutCallback = this.onLogoutCallback
    window.webkit.messageHandlers.logout.postMessage({})
  },
  // 处理退出登录接口返回的值
  onLogoutCallback: function(result) {
    if(result) {
      this.$store.commit('clearUsername')
      alert('退出登录成功')
    } else {
      alert('退出登录失败')
    }
  }
 },
 components: { NavigationBar },
}
</script>

<style lang="scss" scoped>
@import "@css/style.scss";
.my {
  width: 100%;
  height: 100%;
  font-size: 32px;
  .my-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column;
    background-color: $bgColor;
    padding-top: px2rem(10);
    &-enter {
      width: 100%;
      background-color: #fff;
      &-avatar {
        display: flex;
        align-items: center;
        margin: $marginSize;
        img {
          width: px2rem(50);
          height: px2rem(50);
          border-radius: 50%;
          margin-right: $marginSize;
        }
        span {
          font-size: $titleSize;
          font-weight: 500;
        }
      }
    }
    &-list {
      width: 100%;
      display: flex;
      flex-flow: column;
      margin-top: px2rem(5);
      li {
        background-color: #fff;
        border-top: px2rem(1) solid #999;
        display: flex;
        justify-content: space-between;
        padding: $marginSize;
        align-items: center;
        p {
          font-size: $infoSize;
        }
        span {
          img {
            width: px2rem(20);
            height: px2rem(20);
            transform: rotate(180deg);
          }
        }
      }
    }
  }
  .login-content-logout {
    margin-top: 20%;
  }
}
</style>
