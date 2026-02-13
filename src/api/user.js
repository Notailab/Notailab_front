// src/api/user.js（用户相关接口，新建文件）
import request from '@/utils/request'

// 登录接口（POST 请求）
export function login(data) {
  return request({
    url: '/user/login', // 完整地址：baseURL + url = http://localhost:8080/api/user/login
    method: 'post',
    data // 传递用户名/密码（{ username: '', password: '' }）
  })
}

// 注册接口（POST 请求）
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取用户信息（GET 请求）
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'post',
  })
}
