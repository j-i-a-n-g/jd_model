import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@js/htmlFontSize.js'
import '@/assets/js/filter'
import '@/api/index'
import '@js/isIphoneX.js'
// 导入自己的 UI 组件
import UI from '@js/index.js'
import { Skeleton, Button } from 'vant'
// import VueAwesomeSwiper from 'vue-awesome-swiper'

// import 'swiper/dist/css/swiper.css'
// Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(UI)
Vue.config.productionTip = false
Vue.use(Skeleton)
Vue.use(Button)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
