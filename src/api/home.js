import request from '@/api/index'

// 获取轮播图的数据
export const getSwiper = () => request('get', '/swiper')

// 获取520活动图片
export const getActivity = () => request('get', '/activitys')