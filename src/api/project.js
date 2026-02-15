import request from '@/utils/request'

export function createProject(data) {
    return request({
        url: '/project/new',
        method: 'post',
        data
    })
}
