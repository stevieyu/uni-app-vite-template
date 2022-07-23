<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <navigator url="/moduleA/pages/index">
      <view class="text-area">
        <div :class="i" v-for="i in icons" :key="i" />
        <text class="title">
          {{ title }}
        </text>
      </view>
    </navigator>
    <AaBb />
  </view>
</template>

<script setup>
import AaBb from "@/components/AaBb.vue";

const title = 'Hello word'

const icons = [
    'i-fa6-brands-weixin',
]

</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
