import axios from "axios";
import Vue from 'vue'

const request = axios.create({
  baseURL: 'http://api.imooc.hybrid.lgdsunday.club',
  timeout: 3000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  if(config.params) {
    config.params.token = '2c528930-16bd-11ed-99fe-69ad11d67468'
  } else {
    config.params = {
      token: '2c528930-16bd-11ed-99fe-69ad11d67468'
    }
  }
  return config
})

// 响应拦截器
request.interceptors.response.use((response) => {
  return response.data
}, error => {
  // 处理错误的响应
  return Promise.reject(error)
})

// Vue.prototype.$http = request

export default function(method, url, data) {
  return request({
    method,
    url,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: data
  })
}