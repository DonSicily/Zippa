import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref('')
  const vendor = ref(null)

  const wechatLogin = async () => {
    try {
      // 1. Get WeChat login code
      const [err, loginRes] = await uni.login({ provider: 'weixin' })
      if (err) throw err

      // 2. Send code to your Bestiez Backend
      // Note: You need to add a POST /vendors/wechat-login endpoint to your backend
      const res = await uni.request({
        url: 'https://api.bestiez.com/api/vendors/wechat-login',
        method: 'POST',
        data: { code: loginRes.code }
      })

      if (res.data.success) {
        token.value = res.data.data.token
        vendor.value = res.data.data.vendor
        uni.setStorageSync('bestiez_token', token.value)
      }
    } catch (error) {
      console.error('WeChat Login Failed:', error)
    }
  }

  const loadStoredToken = () => {
    const stored = uni.getStorageSync('bestiez_token')
    if (stored) token.value = stored
  }

  return { token, vendor, wechatLogin, loadStoredToken }
})
