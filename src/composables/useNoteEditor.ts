import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    getFilesByProjectID,
    updateFileContent,
    createFile,
    deleteFile
} from '@/api/file'
import { toastSuccess, toastError } from '@/utils/toast'

export function useNoteEditor() {
    const route = useRoute()
    const projectId = route.params.projectid

    // 当前项目下的所有文件
    const fileList = ref([])
    // 当前正在编辑的文件
    const currentFile = ref({
        file_id: null,
        name: '',
        content: ''
    })

    // ======================================
    // 1. 获取当前项目下所有文件
    // ======================================
    const fetchFiles = async () => {
        try {
            const res = await getFilesByProjectID({
                project_id: Number(projectId)
            })
            console.log('获取文件列表响应：', res)
            if (res.code === 200) {
                fileList.value = res.data || []
            } else {
                toastError(res.message || '获取文件列表失败')
            }
        } catch (err) {
            console.error('获取文件异常：', err)
            toastError('网络异常，获取文件失败')
        }
    }

    // ======================================
    // 2. 打开某个文件进行编辑
    // ======================================
    const openFile = (file: any) => {
        currentFile.value = {
            file_id: file.file_id,
            name: file.name || 'Untitled',
            content: file.content || ''
        }
    }

    // ======================================
    // 3. 保存当前编辑的文件
    // ======================================
    const saveFile = async (content: string) => {
        const { file_id } = currentFile.value
        if (!file_id) {
            toastError('未选择文件')
            return false
        }

        try {
            const res = await updateFileContent(file_id, content)
            if (res.code === 200) {
                toastSuccess('保存成功 ✅')
                return true
            } else {
                toastError(res.message || '保存失败')
                return false
            }
        } catch (err) {
            console.error('保存失败：', err)
            toastError('网络异常，保存失败')
            return false
        }
    }

    // ======================================
    // 4. 新建文件
    // ======================================
    const createNewFile = async (fileName: string) => {
        try {
            const res = await createFile({
                project_id: projectId,
                title: fileName
            })
            if (res.code === 200) {
                toastSuccess('新建成功')
                await fetchFiles() // 刷新列表
                return res.data
            } else {
                toastError(res.message || '新建失败')
                return null
            }
        } catch (err) {
            console.error(err)
            toastError('网络异常，新建失败')
            return null
        }
    }

    // ======================================
    // 5. 删除文件
    // ======================================
    const removeFile = async (fileId: number) => {
        try {
            const res = await deleteFile(fileId)
            if (res.code === 200) {
                toastSuccess('删除成功')
                await fetchFiles()
                return true
            } else {
                toastError(res.message || '删除失败')
                return false
            }
        } catch (err) {
            console.error(err)
            toastError('网络异常，删除失败')
            return false
        }
    }

    // ======================================
    // 生命周期：进入页面自动加载文件
    // ======================================
    onMounted(() => {
        if (projectId) fetchFiles()
    })

    return {
        projectId,
        fileList,
        currentFile,
        fetchFiles,
        openFile,
        saveFile,
        createNewFile,
        removeFile
    }
}