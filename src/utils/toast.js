// src/utils/toast.js
/**
 * 自定义 Toast 提示
 * @param {string} message - 提示文本
 * @param {string} type - 类型：success/error/warning/info（默认 error）
 * @param {number} duration - 显示时长（毫秒，默认 2000）
 */
export const showToast = (message, type = 'error', duration = 2000) => {
    // 1. 先移除已存在的 Toast，避免重复
    const oldToast = document.querySelector('.custom-toast')
    if (oldToast) oldToast.remove()

    // 2. 创建 Toast 元素
    const toast = document.createElement('div')
    toast.className = `custom-toast toast-${type}`

    // 3. 设置样式（自适应居中、不同类型不同颜色）
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

    // 4. 根据类型设置背景色
    const bgColors = {
        success: '#10b981', // 绿色（成功）
        error: '#ef4444',   // 红色（错误）
        warning: '#f59e0b', // 黄色（警告）
        info: '#3b82f6'     // 蓝色（信息）
    }
    toast.style.background = bgColors[type] || bgColors.error

    // 5. 设置提示文本
    toast.textContent = message

    // 6. 添加到页面
    document.body.appendChild(toast)

    // 7. 显示动画
    setTimeout(() => {
        toast.style.opacity = '1'
        toast.style.visibility = 'visible'
    }, 10)

    // 8. 自动消失
    setTimeout(() => {
        toast.style.opacity = '0'
        toast.style.visibility = 'hidden'
        setTimeout(() => {
            document.body.removeChild(toast)
        }, 300)
    }, duration)
}

// 快捷方法（简化调用）
export const toastSuccess = (msg) => showToast(msg, 'success')
export const toastError = (msg) => showToast(msg, 'error')
export const toastWarn = (msg) => showToast(msg, 'warning')
export const toastInfo = (msg) => showToast(msg, 'info')
