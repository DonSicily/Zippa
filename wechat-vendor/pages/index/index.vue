<template>
  <view class="container">
    <!-- Header -->
    <view class="header">
      <text class="greeting">Hello, {{ vendor?.companyName || 'Vendor' }}</text>
      <text class="subgreeting">Here's your factory performance today.</text>
    </view>

    <!-- Stats Grid -->
    <view class="stats-grid">
      <view class="stat-card">
        <text class="stat-value primary-text">{{ stats.totalOrders }}</text>
        <text class="stat-label">Total Orders</text>
      </view>
      <view class="stat-card">
        <text class="stat-value accent-text">{{ stats.pendingOrders }}</text>
        <text class="stat-label">Pending Ship</text>
      </view>
    </view>

    <!-- Revenue Card -->
    <view class="card revenue-card">
      <text class="revenue-label">Available Payout Balance</text>
      <text class="revenue-value">¥{{ stats.payoutBalance.toLocaleString() }}</text>
      <view class="btn-primary" style="margin-top: 20rpx;">Request Payout</view>
    </view>

    <!-- Recent Orders -->
    <view class="section-title">Recent Orders</view>
    <view class="card" v-for="order in recentOrders" :key="order._id">
      <view class="order-row">
        <text class="order-id">{{ order.orderNumber }}</text>
        <text class="order-status" :class="order.status === 'Pending' ? 'accent-text' : 'primary-text'">{{ order.status }}</text>
      </view>
      <text class="order-items">{{ order.items.length }} items • ¥{{ order.total }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { getDashboard } from '../../utils/api'

const authStore = useAuthStore()
const vendor = ref(authStore.vendor)
const stats = ref({ totalOrders: 0, pendingOrders: 0, payoutBalance: 0 })
const recentOrders = ref([])

onMounted(async () => {
  try {
    const res = await getDashboard()
    stats.value = res.data.stats
    // Mocking recent orders for UI demo
    recentOrders.value = [
      { _id: '1', orderNumber: 'BSTZ-8X92A', status: 'Pending', items: [1,2], total: 450 },
      { _id: '2', orderNumber: 'BSTZ-7Y81B', status: 'Shipped', items: [1], total: 1200 }
    ]
  } catch (e) { console.error(e) }
})
</script>

<style scoped>
.header { margin-bottom: 30rpx; }
.greeting { font-size: 36rpx; font-weight: 900; display: block; }
.subgreeting { font-size: 24rpx; color: #718096; }
.stats-grid { display: flex; justify-content: space-between; margin-bottom: 20rpx; }
.stat-card { background: #FFF; flex: 1; margin: 0 10rpx; padding: 30rpx; border-radius: 16rpx; text-align: center; box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.05); }
.stat-value { font-size: 40rpx; font-weight: 900; display: block; }
.stat-label { font-size: 22rpx; color: #718096; }
.revenue-card { background: #004E89; color: #FFF; }
.revenue-label { color: rgba(255,255,255,0.8); font-size: 24rpx; }
.revenue-value { color: #FFF; font-size: 48rpx; font-weight: 900; display: block; margin: 10rpx 0; }
.section-title { font-size: 28rpx; font-weight: bold; margin: 30rpx 0 15rpx; }
.order-row { display: flex; justify-content: space-between; margin-bottom: 10rpx; }
.order-id { font-weight: bold; font-size: 26rpx; }
.order-items { font-size: 22rpx; color: #718096; }
</style>
