<template>
  <view class="container">
    <view class="header">
      <text class="title">Bestiez 供应商隐私政策</text>
      <text class="update-date">更新日期：2026年8月4日</text>
      <text class="update-date">生效日期：2026年8月4日</text>
    </view>

    <scroll-view scroll-y class="content">
      <view class="section">
        <text class="section-title">1. 引言</text>
        <text class="body-text">
          欢迎使用Bestiez供应商小程序（以下简称“本小程序”）。本隐私政策旨在向您说明我们如何收集、使用、存储和保护您的个人信息。作为工厂供应商，您的信任对我们至关重要。
        </text>
      </view>

      <view class="section">
        <text class="section-title">2. 我们收集的信息</text>
        <text class="body-text">
          为了提供订单管理和结算服务，我们会收集以下信息：
        </text>
        <text class="bullet-point">• <text class="bold">微信账号信息：</text> 您的微信昵称、头像（用于账户识别）。</text>
        <text class="bullet-point">• <text class="bold">联系方式：</text> 您的手机号码（用于订单紧急联系和结算验证）。</text>
        <text class="bullet-point">• <text class="bold">业务信息：</text> 您的工厂名称、发货地址、支付宝/微信收款账号（用于货款结算）。</text>
        <text class="bullet-point">• <text class="bold">设备信息：</text> 手机型号、操作系统版本（用于优化小程序性能）。</text>
      </view>

      <view class="section">
        <text class="section-title">3. 信息的用途</text>
        <text class="body-text">
          我们收集的信息将用于：
        </text>
        <text class="bullet-point">• 处理、跟踪和完成尼日利亚学生的订单。</text>
        <text class="bullet-point">• 向您发送订单状态更新和系统通知。</text>
        <text class="bullet-point">• 处理每周的货款结算（Payouts）。</text>
        <text class="bullet-point">• 改进我们的服务质量和用户体验。</text>
      </view>

      <view class="section">
        <text class="section-title">4. 信息共享与披露</text>
        <text class="body-text">
          我们绝不会出售您的个人信息。我们仅在以下情况下共享必要信息：
        </text>
        <text class="bullet-point">• <text class="bold">物流合作伙伴：</text> 将发货地址和联系人信息共享给SPEEDAF等物流服务商，以便将货物运至集运仓。</text>
        <text class="bullet-point">• <text class="bold">法律要求：</text> 在法律法规要求或保护我们合法权益的情况下。</text>
      </view>

      <view class="section">
        <text class="section-title">5. 您的权利</text>
        <text class="body-text">
          您有权访问、更正或删除您的个人信息。您可以在“个人中心”页面修改您的工厂资料和收款账号。如需注销账户，请联系我们的客服。
        </text>
      </view>

      <view class="section">
        <text class="section-title">6. 联系我们</text>
        <text class="body-text">
          如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
        </text>
        <text class="bullet-point">• 邮箱：support@bestiez.com</text>
        <text class="bullet-point">• 微信客服：Bestiez_Support</text>
      </view>
    </scroll-view>

    <view class="footer-btn" @click="goBack">
      <text class="btn-text">我已阅读并同意</text>
    </view>
  </view>
</template>

<script setup>
import { useRouter } from 'vue-router' // Note: In Uni-app, use uni.navigateBack()

const goBack = () => {
  // Save consent to local storage
  uni.setStorageSync('privacy_accepted', true)
  uni.navigateBack()
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #F8FAFC;
}

.header {
  padding: 40rpx 30rpx 20rpx;
  background-color: #FFFFFF;
}

.title {
  font-size: 36rpx;
  font-weight: 900;
  color: #004E89;
  display: block;
  margin-bottom: 10rpx;
}

.update-date {
  font-size: 22rpx;
  color: #718096;
  display: block;
  margin-bottom: 5rpx;
}

.content {
  flex: 1;
  padding: 20rpx 30rpx;
  overflow-y: auto;
}

.section {
  background-color: #FFFFFF;
  padding: 24rpx;
  border-radius: 16rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 2rpx 8rpx rgba(0,0,0,0.03);
}

.section-title {
  font-size: 28rpx;
  font-weight: bold;
  color: #1A202C;
  display: block;
  margin-bottom: 15rpx;
}

.body-text {
  font-size: 26rpx;
  color: #4A5568;
  line-height: 1.6;
  display: block;
  margin-bottom: 10rpx;
}

.bullet-point {
  font-size: 26rpx;
  color: #4A5568;
  line-height: 1.6;
  display: block;
  margin-bottom: 8rpx;
  padding-left: 10rpx;
}

.bold {
  font-weight: bold;
  color: #1A202C;
}

.footer-btn {
  background-color: #004E89;
  padding: 24rpx;
  margin: 20rpx 30rpx 40rpx;
  border-radius: 16rpx;
  text-align: center;
  box-shadow: 0 4rpx 12rpx rgba(0, 78, 137, 0.2);
}

.btn-text {
  color: #FFFFFF;
  font-size: 30rpx;
  font-weight: bold;
}
</style>
