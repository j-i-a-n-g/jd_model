<template>
  <div class="register">
    <NavigationBar :pageName="'注册'" @onLeftClick="onLeftClick"></NavigationBar>
    <!-- 内容区 -->
    <div class="register-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input v-model="username" type="text" placeholder="请输入用户名">
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input v-model="password" type="password" placeholder="请输入密码">
      </div>
      <!-- 确认密码 -->
      <div class="input-container">
        <input v-model="confirmpassword" type="password" placeholder="请重复输入密码">
      </div>
      <div class="register-content-register page-commit" @click="onRegisterClick">注册</div>
    </div>
  </div>
</template>

<script>
import NavigationBar from '@/components/NavigationBar.vue';
export default {
    name: "Register",
    data() {
      return {
        username: '',
        password: '',
        confirmpassword: ''
      }
    },
    methods: {
      // 后退到上一个页面
      onLeftClick: function() {
        this.$router.go(-1)
      },
      // 点击注册按钮事件
      onRegisterClick: function() {
        if(this.username) {
          alert('请完善用户名')
          return
        }
        if(this.password || this.password !== this.confirmpassword ) {
          alert('密码输入不一致，请检查密码')
        }
      }
    },
    components: { NavigationBar }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.register {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  &-content {
    width: 100%;
    height: 100%;
    &-register {
      margin-top: 40%;
    }
  }
}
</style>