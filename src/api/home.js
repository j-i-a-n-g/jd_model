import request from '@/api/index'

// 获取轮播图的数据
export const getSwiper = () => request('get', '/swiper')

// 获取520活动图片
export const getActivity = () => request('get', '/activitys')

// 获取秒杀专区的信息
export const getSpike = () => request('get', '/seconds')

// 获取商品列表
export const getGoodsList = () => request('get', '/goods')