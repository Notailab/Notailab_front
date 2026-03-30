import axios from 'axios'
// 如果没用 Element Plus，可替换为你自己的 Toast 提示
import { toastWarn, toastInfo } from '@/utils/toast'

// 1. 创建 axios 实例
const service = axios.create({
    baseURL: '/api', // 环境变量配置（推荐）
    timeout: 5000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

// 2. 请求拦截器（发送请求前处理）
service.interceptors.request.use(
    (config) => {
        // 添加登录 token（登录后存在 localStorage）
        const token = localStorage.getItem('token')
        if (token) {
        config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        // 请求错误处理
        console.error('请求出错：', error)
        return Promise.reject(error)
    }
)

// 3. 响应拦截器（接收响应后处理）
service.interceptors.response.use(
    (response) => {
        // 核心：判断 HTTP 状态码是否为 200
        if (response.status !== 200) {
        toastInfo(`请求失败，状态码：${response.status}`)
        return Promise.reject(new Error(`状态码：${response.status}`))
        }
        return response.data
    },
    (error) => {
        // 处理非 200 状态码/网络错误
        let message = '请求失败'
        if (error.response) {
        // 服务器返回了响应（4xx/5xx）
        const { status, data } = error.response
        message = `${status} - ${data.message || '服务器错误'}`

        // 针对常见状态码的特殊处理
        switch (status) {
            case 400:
                message = '参数错误：' + (data.message || '请检查输入内容')
                break
            case 401:
                message = '未登录/登录过期，请重新登录'
                localStorage.removeItem('token') // 清除失效 token
                window.location.href = '/login' // 跳转到登录页
                break
            case 403:
                message = '无权限访问，请联系管理员'
                break
            case 404:
                message = '接口不存在'
                break
            case 500:
                message = '服务器内部错误，请稍后重试'
                break
        }
        } else if (error.request) {
            // 请求已发送，但无响应（网络错误）
            message = '网络异常，请检查网络连接'
        }

        toastWarn(message) // 替换为你的 Toast 组件
        console.error('响应错误：', error)
        return Promise.reject(error)
    }
)

// 4. 封装常用请求方法（可选，简化调用）
export const request = {
    get: (url, params) => service.get(url, { params }),
    post: (url, data) => service.post(url, data),
    put: (url, data) => service.put(url, data),
    delete: (url) => service.delete(url)
}

// 默认导出（兼容两种调用方式）
export default service
