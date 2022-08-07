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
import md5 from '@js/md5.min.js';
export default {
    name: "Register",
    data() {
      return {
        username: '',
        password: '',
        confirmpassword: '',
        md5password: ''
      }
    },
    methods: {
      // 后退到上一个页面
      onLeftClick: function() {
        this.$router.go(-1)
      },
      // 点击注册按钮事件
      onRegisterClick: function() {
        if(!this.username) {
          alert('请完善用户名')
          return
        }
        if(!this.password || this.password !== this.confirmpassword ) {
          alert('密码输入不一致，请检查密码')
          return
        }
        // 与原生交互，使用md5加密密码
        this.md5password = md5(this.password)
        // 判断当前项目的运行环境是安卓还是IOS
        if(window.androidJSBridge) {
          //  运行环境为安卓
        } else if(window.webkit) {
          // 运行环境为IOS
          this.onRegisterToIOS()
        }
      },
      // 调用 android 注册接口
      onRegisterToAndroid: function() {
        // 安卓只能接收基本类型
        let userJson = JSON.stringify({
          'username': this.username,
          'password': this.md5password
        })
        // 安卓可以直接返回返回值
        let result = window.androidJSBridge.register(userJson)
        this.onRegisterCallback(result)
      },
      // 调用 IOS 注册接口
      onRegisterToIOS: function() {
        // IOS能接收对象类型数据
        let userObj = {
          'username': this.username,
          'password': this.md5password
        }
        // IOS不能返回返回值，会回调方法
        // IOS所回调的方法只能是绑定到 window 对象中的方法
        window.registerCallback = this.onRegisterCallback
        // Native 执行完成之后，会回调registerCallback
        window.webkit.messageHandlers.register.postMessage(userObj)
      },
      // 处理 native 注册接口的返回值，是否注册成功
      onRegisterCallback: function(result) {
        if(result) {
          alert('注册成功')
          this.onLeftClick()
        } else {
          alert('注册失败，请重新注册')
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