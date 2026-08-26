import { useAuthStore } from '../stores/auth'

const BASE_URL = 'https://api.bestiez.com/api' // Replace with your Railway URL

export const request = (options) => {
  return new Promise((resolve, reject) => {
    const authStore = useAuthStore()
    
    uni.request({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        'Authorization': authStore.token ? `Bearer ${authStore.token}` : ''
      },
      success: (res) => {
        if (res.statusCode === 200 || res.statusCode === 201) {
          resolve(res.data)
        } else if (res.statusCode === 401) {
          // Token expired, re-login
          authStore.wechatLogin()
          reject(res.data)
        } else {
          uni.showToast({ title: res.data.message || 'Error', icon: 'none' })
          reject(res.data)
        }
      },
      fail: (err) => {
        uni.showToast({ title: 'Network Error', icon: 'none' })
        reject(err)
      }
    })
  })
}

// Specific API calls
export const getDashboard = () => request({ url: '/vendors/dashboard' })
export const getOrders = (params) => request({ url: '/vendors/orders', data: params })
// FIX: was calling PUT /vendors/orders/${id} — the actual backend route
// (added in vendorController.updateOrderItemStatus) is
// PUT /vendors/orders/:id/status.
export const updateOrderStatus = (id, status) => request({ url: `/vendors/orders/${id}/status`, method: 'PUT', data: { status } })
