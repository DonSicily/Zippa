<template>
  <view class="container">
    <view class="filter-tabs">
      <view class="tab" :class="{ active: filter === 'Pending' }" @click="filter = 'Pending'">Pending ({{ pendingCount }})</view>
      <view class="tab" :class="{ active: filter === 'All' }" @click="filter = 'All'">All Orders</view>
    </view>

    <view class="card" v-for="order in filteredOrders" :key="order._id">
      <view class="order-header">
        <text class="order-id">{{ order.orderNumber }}</text>
        <text class="order-date">{{ order.date }}</text>
      </view>
      
      <view class="order-items-list">
        <view class="item-row" v-for="item in order.items" :key="item._id">
          <text class="item-name">{{ item.productName }}</text>
          <text class="item-qty">x{{ item.quantity }}</text>
        </view>
      </view>

      <view class="order-footer">
        <text class="ship-to">Ship to: Bestiez Guangzhou Hub</text>
        <view class="btn-primary" v-if="order.status === 'Pending'" @click="markShipped(order._id)">
          Mark as Shipped
        </view>
        <view class="btn-shipped" v-else>
          Shipped to Hub
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { updateOrderStatus } from '../../utils/api'

const filter = ref('Pending')
const pendingCount = ref(2)

const orders = ref([
  { _id: '1', orderNumber: 'BSTZ-8X92A', date: '2026-08-01', status: 'Pending', items: [{ productName: 'Wireless Earbuds', quantity: 2 }] },
  { _id: '2', orderNumber: 'BSTZ-7Y81B', date: '2026-08-01', status: 'Shipped', items: [{ productName: 'Smart Watch', quantity: 1 }] }
])

const filteredOrders = computed(() => {
  if (filter.value === 'Pending') return orders.value.filter(o => o.status === 'Pending')
  return orders.value
})

const markShipped = async (id) => {
  uni.showModal({
    title: 'Confirm Shipment',
    content: 'Have you dropped this package at the Bestiez Consolidation Hub?',
    success: async (res) => {
      if (res.confirm) {
        try {
          // FIX: backend Order item status enum uses snake_case values
          // ('shipped_to_hub'), not this human-readable string — sending
          // 'Shipped to Hub' would have failed the enum validation on
          // PUT /vendors/orders/:id/status.
          await updateOrderStatus(id, 'shipped_to_hub')
          uni.showToast({ title: 'Marked as Shipped!', icon: 'success' })
          // Update local state
          const order = orders.value.find(o => o._id === id)
          if (order) order.status = 'Shipped'
        } catch (e) { console.error(e) }
      }
    }
  })
}
</script>

<style scoped>
.filter-tabs { display: flex; margin-bottom: 20rpx; background: #FFF; border-radius: 12rpx; padding: 10rpx; }
.tab { flex: 1; text-align: center; padding: 15rpx; font-size: 26rpx; color: #718096; border-radius: 8rpx; }
.tab.active { background: #004E89; color: #FFF; font-weight: bold; }
.order-header { display: flex; justify-content: space-between; margin-bottom: 15rpx; border-bottom: 1rpx solid #EDF2F7; padding-bottom: 10rpx; }
.order-id { font-weight: bold; color: #004E89; }
.order-date { font-size: 22rpx; color: #718096; }
.item-row { display: flex; justify-content: space-between; margin-bottom: 8rpx; font-size: 26rpx; }
.order-footer { margin-top: 20rpx; padding-top: 15rpx; border-top: 1rpx solid #EDF2F7; }
.ship-to { font-size: 22rpx; color: #718096; display: block; margin-bottom: 15rpx; }
.btn-shipped { background: #C6F6D5; color: #276749; padding: 20rpx; border-radius: 12rpx; text-align: center; font-weight: bold; }
</style>
