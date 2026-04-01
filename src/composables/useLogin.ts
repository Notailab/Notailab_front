import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { login, register } from '@/api/user'
import { toastSuccess, toastError, toastWarn, toastInfo } from '@/utils/toast'

interface Particle {
    id: number
    top: number
    left: number
    size: number
    opacity: number
}

interface LoginForm {
    username: string
    password: string
    remember: boolean
}

interface RegisterForm {
    username: string
    email: string
    password: string
    confirmPwd: string
    agreeProtocol: boolean
}

interface ApiResponse {
    code: number
    token?: string
    [key: string]: any
}

const particleConfig = {
    count: 30,
    minSize: 2,
    maxSize: 8,
    minOpacity: 0.1,
    maxOpacity: 0.3
}

export function useLogin() {
    const particles = ref<Particle[]>([])

    const generateParticles = () => {
        const particlesList: Particle[] = []
        for (let i = 0; i < particleConfig.count; i++) {
            particlesList.push({
                id: i + 1,
                top: Math.random() * 100,
                left: Math.random() * 100,
                size: Math.random() * (particleConfig.maxSize - particleConfig.minSize) + particleConfig.minSize,
                opacity: Math.random() * (particleConfig.maxOpacity - particleConfig.minOpacity) + particleConfig.minOpacity
            })
        }
        particles.value = particlesList
    }

    onMounted(() => {
        generateParticles()
    })

    const activeTab = ref<'login' | 'register'>('login')

    const loginForm = ref<LoginForm>({
        username: '',
        password: '',
        remember: false
    })

    const registerForm = ref<RegisterForm>({
        username: '',
        email: '',
        password: '',
        confirmPwd: '',
        agreeProtocol: false
    })

    const router = useRouter()

    const handleLogin = async () => {
        if (!loginForm.value.username.trim()) {
            toastInfo('请输入用户名！')
            return
        }
        if (!loginForm.value.password.trim()) {
            toastInfo('请输入密码！')
            return
        }

        const res = await login({
            username: loginForm.value.username,
            password: loginForm.value.password
        }) as unknown as ApiResponse

        if (res.code === 200) {
            localStorage.setItem('token', res.token)
            toastSuccess('登录成功')
            router.push('/home')
        } else {
            toastWarn('登录失败')
        }
    }

    const handleRegister = async () => {
        if (!registerForm.value.username.trim()) {
            toastInfo('请输入用户名！')
            return
        }
        if (registerForm.value.username.length < 3 || registerForm.value.username.length > 16) {
            toastInfo('用户名长度需在3-16位之间！')
            return
        }
        if (!registerForm.value.email.trim()) {
            toastInfo('请输入邮箱！')
            return
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(registerForm.value.email)) {
            toastInfo('请输入有效的邮箱地址！')
            return
        }
        if (!registerForm.value.password.trim()) {
            toastInfo('请输入密码！')
            return
        }
        if (registerForm.value.password.length < 6 || registerForm.value.password.length > 16) {
            toastInfo('密码长度需在6-16位之间！')
            return
        }
        if (registerForm.value.password !== registerForm.value.confirmPwd) {
            toastInfo('两次输入的密码不一致！')
            return
        }
        if (!registerForm.value.agreeProtocol) {
            toastInfo('请阅读并同意用户协议和隐私政策！')
            return
        }

        const res = await register({
            username: registerForm.value.username,
            password: registerForm.value.password,
            email: registerForm.value.email
        }) as unknown as ApiResponse

        if (res.code === 200) {
            toastSuccess('注册成功！请登录')
            registerForm.value = {
                username: '',
                email: '',
                password: '',
                confirmPwd: '',
                agreeProtocol: false
            }
            activeTab.value = 'login'
        } else if (res.code === 1001) {
            toastWarn('注册失败，用户名已经被使用')
        } else if (res.code === 1002) {
            toastWarn('注册失败，邮箱已经被使用')
        }
    }

    return {
        particles,
        activeTab,
        loginForm,
        registerForm,
        handleLogin,
        handleRegister
    }
}
