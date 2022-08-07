import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 购物车列表数据
    shoppingList: [],
    // 当前设备是否为IphoneX
    isIphoneX: false,
    // 登录用户的用户名
    username: undefined
  },
  getters: {
  },
  mutations: {
    // 将数据添加到购物车中
    addShopping(state, goods) {
      // 判断用户是否是第一次选择该商品，如果之前已经选过，则商品数量 +1
      const hasGoods = state.shoppingList.some(item => {
        if( item.id === goods.id ) {
          item.buyCount += 1
          return true
        }
      })
      if (!hasGoods) {
        // 为商品数据添加两个新的属性，是否被选中以及选中商品的数量
        Vue.set(goods, 'isCheck', false)
        Vue.set(goods, 'buyCount', 1)
        state.shoppingList.push(goods)
      }
    },
    // 改变购物车列表中指定商品的buyCount 值
    changeBuyCount: function(state, data) {
      state.shoppingList[data.index].buyCount = data.newV
    },
    // 修改 isIphoneX
    setIsIphoneX: function(state, isIphoneX) {
      state.isIphoneX = isIphoneX
    },
    // 保存用户名
    setUsername: function(state, username) {
      state.username = username
    },
    // 删除用户名，退出登录
    clearUsername: function(state) {
      state.username = undefined
    }
  },
  actions: {
  },
  modules: {
  }
})
