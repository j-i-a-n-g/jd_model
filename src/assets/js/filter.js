import Vue from 'vue';

// 对价格数据进行处理
Vue.filter('priceValue', (value) => {
  if(!value) {
    return 0.00;
  }

  // 文本转换成浮点数据
  const result = parseFloat(value)

  // 判断文本是否有小数，isINteger, 表示当前没有小数
  if(Number.isInteger(result)) {
    return result
  }
  return result.toFixed(2)
})