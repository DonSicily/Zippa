<!-- FIX: pages.json (and the tabBar) reference "pages/products/products",
     but this file did not exist — the Products tab in the mini-program
     would have failed to load at all. Built to match the existing
     index/orders pages' style and API usage pattern. -->
<template>
  <view class="container">
    <view class="header-row">
      <text class="section-title">My Products</text>
    </view>

    <view class="card" v-for="product in products" :key="product._id">
      <view class="product-row">
        <image class="thumb" :src="product.images?.[0]?.url" mode="aspectFill" />
        <view class="info">
          <text class="name">{{ product.name }}</text>
          <text class="price">¥{{ product.price?.factoryPrice }}</text>
          <text class="status" :class="statusClass(product.status)">{{ product.status }}</text>
        </view>
      </view>
    </view>

    <view v-if="!loading && products.length === 0" class="empty-state">
      <text class="empty-text">No products yet. Add products from the Vendor Portal web app.</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { request } from '../../utils/api'

const products = ref([])
const loading = ref(true)

const statusClass = (status) => {
  if (status === 'approved') return 'primary-text'
  if (status === 'pending_approval') return 'accent-text'
  return ''
}

onMounted(async () => {
  try {
    const res = await request({ url: '/vendors/products' })
    products.value = res.data || []
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.header-row { margin-bottom: 20rpx; }
.section-title { font-size: 32rpx; font-weight: 900; }
.product-row { display: flex; align-items: center; }
.thumb { width: 100rpx; height: 100rpx; border-radius: 12rpx; background: #EDF2F7; margin-right: 20rpx; }
.info { flex: 1; }
.name { font-size: 26rpx; font-weight: bold; display: block; margin-bottom: 6rpx; }
.price { font-size: 24rpx; color: #FF6B35; font-weight: bold; display: block; margin-bottom: 6rpx; }
.status { font-size: 20rpx; text-transform: capitalize; }
.empty-state { padding: 60rpx 20rpx; text-align: center; }
.empty-text { color: #718096; font-size: 24rpx; }
</style>
