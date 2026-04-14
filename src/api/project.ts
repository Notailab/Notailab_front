import request from '@/utils/request'

export function createProject(data) {
    return request({
        url: '/project/new',
        method: 'post',
        data
    })
}

export function getProject(data) {
    return request({
        url: '/project/get',
        method: 'post',
        data
    })
}

export function updateProject(data) {
    return request({
        url: '/project/update',
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

export function projects() {
    return request({
        url: '/project/projects',
        method: 'post',
    })
}