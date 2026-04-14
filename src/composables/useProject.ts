import { ref, onMounted } from 'vue'
import { projects } from '@/api/project'
import { toastError } from '@/utils/toast'

// 项目类型定义
export interface Project {
    project_id: number
    user_id: number
    title: string
    description: string
    status: string
    start_date: string
    end_date: string
    progress: number
    created_at: string
    updated_at: string
}

const sortProjectsByUpdatedAtDesc = (items: Project[]) => {
    return [...items].sort((left, right) => {
        const leftTime = new Date(left.updated_at || 0).getTime()
        const rightTime = new Date(right.updated_at || 0).getTime()
        return rightTime - leftTime
    })
}

// 业务 Hook：完全独立，不写在 vue 里
export function useProjects() {
    const projectList = ref<Project[]>([])
    const loading = ref(false)

    // 从后端获取项目列表
    const fetchProjects = async () => {
        try {
            loading.value = true
            const res = await projects()

            if (res.code === 200) {
                projectList.value = sortProjectsByUpdatedAtDesc(Array.isArray(res.projects) ? res.projects : [])
            } else {
                toastError(res.message || '获取项目失败')
            }
        } catch (err) {
            console.error('获取项目异常：', err)
            toastError('网络异常，请稍后重试')
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchProjects()
    })

    return {
        projectList,
        loading,
        fetchProjects
    }
}