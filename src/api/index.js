import axios from "axios";
import Vue from 'vue'

const request = axios.create({
  baseURL: 'http://api.imooc.hybrid.lgdsunday.club',
  timeout: 3000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  if(config.params) {
    config.params.token = '3f86d3f0-12d8-11ed-a44b-132b914c803f'
  } else {
    config.params = {
      token: '3f86d3f0-12d8-11ed-a44b-132b914c803f'
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