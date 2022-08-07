/***
 * 判断当前设备是否为IphoneX
 * @return boolean true 则表示当前设备为IphoneX
 */
const isIphoneX = () => {
  // window 对象存在执行逻辑
  if (typeof window !== 'undefined' && window) {
    // window.navigator.userAgent 如果包含 iphone 表示当前的设备在 IOS 设备中运行
    // IphoneX 及以上的设备 屏幕垂直像素数大于 812
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
  }
  return false
}
// 将计算结果赋值给 window 对象下的一个属性
window.isIphoneX = isIphoneX();