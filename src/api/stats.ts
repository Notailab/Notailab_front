import request from '@/utils/request'

export interface ApiResponse<T> {
    code: number
    message?: string
    data?: T
    [key: string]: unknown
}

export interface StatsTrendPoint {
    label: string
    value: number
}

export interface StatsProjectVelocity {
    project_id: number
    title: string
    progress: number
    file_count: number
}

export interface StatsOverview {
    total_projects: number
    total_files: number
    total_words: number
    active_projects: number
    ai_conversations: number
    recent_project_updates: number
    recent_file_updates: number
    monthly_activity: StatsTrendPoint[]
    project_velocity: StatsProjectVelocity[]
    insights: string[]
    last_updated: string
}

export function getStatsOverview(): Promise<ApiResponse<StatsOverview>> {
    return request({
        url: '/stats/overview',
        method: 'get'
    }) as Promise<ApiResponse<StatsOverview>>
}