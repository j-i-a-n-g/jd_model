<template>
  <div class="goods-options z-index-2">
    <!-- 一级筛选项 -->
    <ul class="goods-options-list">
      <li class="goods-options-list-item" 
      v-for="(item, index) in optionsDatas" :key="index" @click="onOptionsItemClick(item, index)">
      <a class="goods-options-list-item-content">
        <span class="goods-options-list-item-content-name" 
        :class="{'goods-options-list-item-content-name-active': isSelectedOption.id === item.id}">{{item.name}}</span>
        <!-- 三角形符号 -->
        <span class="goods-options-list-item-content-icon careticon" :class="isShowSubContent ? 'careticon-open' : 'careticon-close'"
        v-show="item.subs"></span>
      </a>
      </li>
    </ul>
    <!-- 子选项内容 -->
    <transition name="subTransition">
      <div class="options-sub-content z-index-2"  v-show="isShowSubContent">
      <ul class="options-sub-content-list">
        <li class="options-sub-content-list-item" 
        v-for="(item, index) in isSelectedOption.subs" :key="index" @click="onClickSubOption(item, index)">
          <a class="options-sub-content-list-item-content">
            <span class="options-sub-content-list-item-content-name"
            :class="{'options-sub-content-list-item-content-name-active' : isSelectedOption.id === item?.id}">{{item.name}}</span>
            <img class="options-sub-content-list-item-content-icon" src="@img/options-select.svg" v-show="isSelectedOption.id === item?.id">
          </a>
        </li>
      </ul>
    </div>
    </transition>
    <!-- 覆盖层 -->
    <div class="cover" v-show="isShowSubContent" @click="closeCover"></div>
  </div>
</template>

<script>
export default {
  name: 'GoodsOpitons',
  data() {
    return {
      // 筛选项数据源
      optionsDatas: [
        {
        id: '1',
        name: '默认',
        subs: [
          {
          id: '1',
          name: '默认'
          },
          {
          id: '1-2',
          name: '价格由高到低'
          },
          {
          id: '1-3',
          name: '销量由高到低'
          },
        ]
      },{
        id: '2',
        name: '有货优先'
      }, {
        id: '3',
        name:'直营优先'
      }
      ],
      // 选中的筛选项：
      isSelectedOption: {
        id: '',
        name: '',
        subs: []
      },
      // 子选项是否展开
      isShowSubContent: false
    }
  },
  created() {
    this.isSelectedOption = this.optionsDatas[0]
  },
  methods: {
    // 点击一级筛选项时的事件
    onOptionsItemClick(item, index) {
      // 判断子选项是否展开，展开的话则进行关闭
      if(this.isShowSubContent) {
        return this.isShowSubContent = false
      }
      if(item.subs && this.isSelectedOption.id === item.id) {
        this.isShowSubContent = true
      }
      this.isSelectedOption = this.optionsDatas[index]
      this.$emit('updateId', item.id)
    },
    // 点击子选项时的事件
    onClickSubOption(item) {
      // 1.被点击的子选项会替换一级筛选项内容
      if(this.isSelectedOption.name !== item.name) {
        this.isSelectedOption.id = item.id
        this.isSelectedOption.name = item.name
      }
      this.$emit('updateId', item.id)
      // 2.子选项列表关闭 （isShowSubContent false）
      this.isShowSubContent = false
    },
    // 关闭遮盖层
    closeCover() {
      this.isShowSubContent = false
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-options {
  width: 100%;
  border-bottom: 1px solid $lineColor;
  &-list {
    width: 100%;
    height: px2rem(46);
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    &-item {
      flex-grow: 1;
      &-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &-name {
          font-size: $infoSize;
          margin-right: $marginSize;
          &-active {
            color: $mainColor;
          }
        }
      }
    }
  }
  // 子选项
  .options-sub-content {
    position: absolute;
    width: 100%;
    max-height: px2rem(150);
    overflow: hidden;
    overflow-y: auto;
    background-color: #fff;
    &-list {
      &-item {
        &-content {
          display: flex;
          align-items: center;
          border-top: 1px solid $lineColor;
          padding: $marginSize;
          height: px2rem(44);
          box-sizing: border-box;
          &-name {
            font-size: $infoSize;
            display: inline-block;
            flex-grow: 1;
            &-active {
              color: $mainColor;
            }
          }
          &-icon {
            width: px2rem(18);
            height: px2rem(18);
          }
        }
      }
    }
  }
}
// 三角形动画
.careticon-open {
  transform: rotate(-180deg);
  transition: all .3s;
}
.careticon-close {
  transform: rotate(0deg);
  transition: all .3s;
}
// 子选项列表展开与关闭时的动画
.subTransition-enter-active {
  animation: subOpen .5s;
}
@keyframes subOpen {
  0% {
    max-height: 0px;
  }
  100% {
    max-height: px2rem(150);
  }
}
.subTransition-leave-active {
  animation: subClose .5s;
}
@keyframes subClose {
  0% {
    max-height: px2rem(150);
  }
  100% {
    max-height: 0px;
  }
}
// 覆盖层的样式
.cover {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0,0,0,.4);
}
</style>