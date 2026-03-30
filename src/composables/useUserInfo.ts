import { ref } from 'vue'
import { getUserInfo } from '@/api/user'
import { toastError } from '@/utils/toast'

export function useUserInfo() {
    const userInfo = ref({
        username: 'User',
        avatar: '',
        email: '',
        create_time: ''
    })

    const fetchUserInfo = async () => {
        try {
            const res = await getUserInfo()
            if (res.code === 200) {
                userInfo.value = {
                    username: res.username,
                    avatar: res.avatar,
                    email: res.email,
                    create_time: res.create_time
                }
            } else {
                toastError(res.message || '获取用户信息失败')
            }
        } catch (err) {
            console.error(err)
            toastError('网络异常，获取用户信息失败')
        }
    }

    return {
        userInfo,
        fetchUserInfo
    }
}