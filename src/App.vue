<template>
  <div id="app">
    <!-- 
      页面跳转滑动状态的保存
        1.将缓存的组件中的数据都保存下来
        2.在组件中创建一个变量，会被keep-alive保存起来，该变量用于保存页面滑动的状态
        3.当跳转回到页面时，使用该变量改变页面滑动的距离
       -->
    <transition :name="transitionName">
    <!-- 将通过router-view加载的页面组件缓存起来 -->
    <keep-alive :include="virtualTaskStack">
      <router-view/>
    </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: '',
      // 创建虚拟的任务执行栈
      virtualTaskStack: ['Main']
    }
  },
  watch: {
    // 监听路由对象，决定使用哪种过渡效果
    '$route'(to, from) {
      // 获取到携带的标记
      const routeType = to.params.routeType
      if(routeType === 'push') {
        // 跳转页面
        this.transitionName = 'fold-left'
        // 往虚拟任务栈内放置
        this.virtualTaskStack.push(to.name)
      } else {
        // 后退页面
        this.transitionName = 'fold-right'
        // 将最后的任务从虚拟任务栈中推出
        this.virtualTaskStack.pop()
      }
      // 初始化虚拟renwuzh
      if (to.params.clearTask === 'clear') {
        this.virtualTaskStack = ['Main']
      }
    }
  }
}
</script>

<style lang="scss">
@import '@css/style.scss';
#app {
  width: 100%;
  height: 100%;
}
.fold-left-enter-active {
  animation: fold-left-in .5s;
}
.fold-left-leave-active {
  animation: fold-left-out .5s;
}
.fold-right-enter-active {
  animation: fold-right-in .5s;
}
.fold-right-leave-active {
  animation: fold-right-out .5s;
}
// push 页面时：原页面的离开动画
@keyframes fold-left-out {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-100%, 0);
  }
}
// push 页面时，新页面的进入动画
@keyframes fold-left-in {
  from {
    transform: translate(100%, 0);
  }
  to {
    transform: translate(0, 0);
  }
}
// go 退回上一级页面时，新页面的离开动画
@keyframes fold-right-out {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(100%, 0);
  }
}
// go 退回上一级页面时，原页面的进入动画
@keyframes fold-right-in {
  from {
    transform: translate(-100%, 0);
  }
  to {
    transform: translate(0, 0);
  }
}
</style>
