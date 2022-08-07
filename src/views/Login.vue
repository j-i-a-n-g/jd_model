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
export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      // 返回上一个页面
      onLeftClick: function() {
        this.$router.go(-1)
      },
      onLoginClick: function() {
        // 验证用户输入内容是否合法
        if(this.username || this.password) {
          alert('用户名或密码不能为空')
          return
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