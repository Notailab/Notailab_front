import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { toastInfo, toastWarn } from '@/utils/toast'

interface ApiErrorData {
    message?: string
}

const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    }
})

service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => {
        console.error('请求出错：', error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            toastInfo(`请求失败，状态码：${response.status}`)
            return Promise.reject(new Error(`状态码：${response.status}`))
        }
        return response.data
    },
    (error: AxiosError<ApiErrorData>) => {
        let message = '请求失败'

        if (error.response) {
            const { status, data } = error.response
            message = `${status} - ${data.message || '服务器错误'}`

            switch (status) {
                case 400:
                    message = '参数错误：' + (data.message || '请检查输入内容')
                    break
                case 401:
                    message = '未登录/登录过期，请重新登录'
                    localStorage.removeItem('token')
                    window.location.href = '/login'
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
            message = '网络异常，请检查网络连接'
        }

        toastWarn(message)
        console.error('响应错误：', error)
        return Promise.reject(error)
    }
)

export const request = {
    get: (url: string, params?: Record<string, unknown>) => service.get(url, { params }),
    post: (url: string, data?: unknown) => service.post(url, data),
    put: (url: string, data?: unknown) => service.put(url, data),
    delete: (url: string) => service.delete(url)
}

export default service