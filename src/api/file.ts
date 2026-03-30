import request from '@/utils/request'

// 新建文件
export function createFile(data) {
    return request({
        url: '/file/new',
        method: 'post',
        data
    })
}

// 获取项目下的所有文件
export function getFilesByProjectID(data) {
    return request({
        url: '/file/all',
        method: 'post',
        data
    })
}

// 更新文件内容
export function updateFileContent(fileId, content) {
    return request({
        url: `/file/${fileId}`,
        method: 'put',
        data: { content }
    })
}

// 删除文件
export function deleteFile(fileId) {
    return request({
        url: `/file/${fileId}`,
        method: 'delete'
    })
}