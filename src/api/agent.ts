import request from '@/utils/request'

export function chatWithAgent(data) {
    return request({
        url: '/agent/chat',
        method: 'post',
        timeout: 120000,
        data
    })
}
