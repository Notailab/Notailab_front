import request from '@/utils/request'

export function createProject(data) {
    return request({
        url: '/project/new',
        method: 'post',
        data
    })
}

export function projectTitles() {
    return request({
        url: '/project/titles',
        method: 'post',
    })
}
