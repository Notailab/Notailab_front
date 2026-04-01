export type ToastType = 'success' | 'error' | 'warning' | 'info'

export const showToast = (message: string, type: ToastType = 'error', duration = 2000) => {
    const oldToast = document.querySelector('.custom-toast')
    if (oldToast) oldToast.remove()

    const toast = document.createElement('div')
    toast.className = `custom-toast toast-${type}`
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 16px;
        border-radius: 4px;
        color: white;
        font-size: 14px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
    `

    const bgColors: Record<ToastType, string> = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    }

    toast.style.background = bgColors[type] || bgColors.error
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
        toast.style.opacity = '1'
        toast.style.visibility = 'visible'
    }, 10)

    setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.visibility = 'hidden'
        setTimeout(() => {
            document.body.removeChild(toast)
        }, 300)
    }, duration)
}

export const toastSuccess = (msg: string) => showToast(msg, 'success')
export const toastError = (msg: string) => showToast(msg, 'error')
export const toastWarn = (msg: string) => showToast(msg, 'warning')
export const toastInfo = (msg: string) => showToast(msg, 'info')