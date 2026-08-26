<!-- FIX: pages.json (and the tabBar) reference "pages/profile/profile",
     but this file did not exist — the Profile tab would have failed to
     load. Also links to the privacy policy page created earlier in this
     project (pages/privacy/privacy.vue), which existed on disk but was
     never registered in pages.json's `pages` array either (fixed there). -->
<template>
  <view class="container">
    <view class="card profile-card">
      <view class="avatar">{{ initials }}</view>
      <text class="company-name">{{ vendor?.companyName || 'Vendor' }}</text>
      <text class="email">{{ vendor?.email }}</text>
      <text class="status-badge" :class="vendor?.status === 'approved' ? 'primary-text' : 'accent-text'">
        {{ vendor?.status }}
      </text>
    </view>

    <view class="card">
      <navigator url="/pages/privacy/privacy" class="menu-row">
        <text>Privacy Policy</text>
        <text class="chevron">›</text>
      </navigator>
      <view class="menu-row" @click="logout">
        <text class="logout-text">Log Out</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const vendor = authStore.vendor

const initials = computed(() => {
  const name = vendor?.companyName || 'V'
  return name.charAt(0).toUpperCase()
})

const logout = () => {
  uni.showModal({
    title: 'Log Out',
    content: 'Are you sure you want to log out?',
    success: (res) => {
      if (res.confirm) {
        uni.removeStorageSync('bestiez_token')
        authStore.token = ''
        authStore.vendor = null
        authStore.wechatLogin()
      }
    }
  })
}
</script>

<style scoped>
.profile-card { text-align: center; padding: 40rpx 24rpx; }
.avatar { width: 120rpx; height: 120rpx; border-radius: 60rpx; background: #004E89; color: #FFF; font-size: 48rpx; font-weight: 900; display: flex; align-items: center; justify-content: center; margin: 0 auto 20rpx; }
.company-name { font-size: 32rpx; font-weight: bold; display: block; margin-bottom: 6rpx; }
.email { font-size: 24rpx; color: #718096; display: block; margin-bottom: 12rpx; }
.status-badge { font-size: 22rpx; font-weight: bold; text-transform: capitalize; }
.menu-row { display: flex; justify-content: space-between; align-items: center; padding: 24rpx 0; border-bottom: 1rpx solid #EDF2F7; }
.chevron { color: #A0AEC0; font-size: 28rpx; }
.logout-text { color: #E53E3E; font-weight: bold; }
</style>
