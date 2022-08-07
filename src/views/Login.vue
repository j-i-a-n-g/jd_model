<template>
  <div class="login">
    <NavigationBar :pageName="'登录'" @onLeftClick="onLeftClick"></NavigationBar>
    <!-- 内容区 -->
    <div class="login-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input v-model="username" type="text" placeholder="请输入用户名">
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input v-model="password" type="password" placeholder="请输入密码">
      </div>
      <div class="login-content-login page-commit" @click="onLoginClick">登录</div>
       <a class="login-content-register" @click="rouerToRegisterClick">注册新用户</a>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
import md5 from '@js/md5.min.js';
export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        md5password: '',
      }
    },
    methods: {
      // 返回上一个页面
      onLeftClick: function() {
        this.$router.go(-1)
      },
      onLoginClick: function() {
        // 验证用户输入内容是否合法
        if(!this.username || !this.password) {
          alert('用户名或密码不能为空')
          return
        }
        this.md5password = md5(this.password)
        // 判断项目运行的环境是安卓设备还是 IOS 设备
        if(window.androidJSBridge) {
          // 安卓环境
          this.onLoginToAndriod()
        } else if (window.webkit) {
          // IOS 环境
          this.onLoginToIOS()
        }
      },
      // 跳转到注册页面
      rouerToRegisterClick: function() {
        this.$router.push({
          name: 'Register',
          params: {
            routeType: 'push'
          }
        })
      },
      // 登录账号功能
      onLoginToAndriod: function() {
       let userJson = JSON.stringify({
          'username': this.username,
          'password': this.md5password
        })
        // 调用 andriod 登录接口
        let string = window.androidJSBridge.login(userJson)
        this.onLoginCallback(string)
      },
      onLoginToIOS: function() {
       let userJson = {
          'username': this.username,
          'password': this.md5password
        }
        // 回调方法
        window.loginCallback = this.onLoginCallback
        // 调用 IOS 登录接口
        window.webkit.messageHandlers.login.postMessage(userJson)
      },

      //  处理登录接口返回函数
      onLoginCallback: function(result) {
        switch (result) {
          case -1:
            alert('服务器错误，请重试')
            break;
          case 0:
            this.$store.commit('setUsername', this.username)
            this.onLeftClick()
            break;
          case 1:
            alert('登录用户不存在，请先注册')
            break;
          case 2:
            alert('密码错误，请查正再试')
            break;
        }
      }
    },
    components: { NavigationBar }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.login {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  &-content {
    width: 100%;
    height: 100%;
    &-login {
      margin-top: 40%;
    }
    &-register {
      font-size: $infoSize;
      color: $hintColor;
      margin-top: $marginSize;
      padding: $marginSize;
      float: right;
      text-decoration: none;
    }
  }
}
</style>