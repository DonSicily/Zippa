<script setup>
import { onLaunch, onShow } from '@dcloudio/uni-app'
import { useAuthStore } from './stores/auth'

onLaunch(() => {
  console.log('App Launch')
})

onShow(() => {
  const authStore = useAuthStore()
  // Check if user is logged in on every app open
  if (!authStore.token) {
    authStore.wechatLogin()
  }
})
</script>

<style>
/* Global Styles for Bestiez Vendor Theme */
page {
  background-color: #F4F6F8;
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  color: #1A202C;
}

.container { padding: 20rpx; }
.card {
  background-color: #FFFFFF;
  border-radius: 16rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05);
}
.primary-text { color: #004E89; font-weight: bold; }
.accent-text { color: #FF6B35; font-weight: bold; }
.btn-primary {
  background-color: #004E89;
  color: #FFFFFF;
  padding: 20rpx;
  border-radius: 12rpx;
  text-align: center;
  font-weight: bold;
}
</style>
