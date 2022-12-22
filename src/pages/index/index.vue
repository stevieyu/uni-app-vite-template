<template>
  <view class="content" v-if="false">
    <image class="logo" src="/static/logo.png"></image>
    <navigator url="/moduleA/pages/index">
      <view class="text-area">
        <text class="title">
          {{ title }}
        </text>
      </view>
    </navigator>
    <AaBb />
    <button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
      <image class="avatar" :src="avatarUrl"></image>
    </button>
    <input type="nickname" placeholder="请输入昵称"/>
  </view>
</template>

<script setup>
import AaBb from "@/components/AaBb.vue";

const title = 'Hello word'

let avatarUrl = $ref('https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0')
const onChooseAvatar = (e) => {
  // const { avatarUrl } = e.detail
  avatarUrl = e.detail.avatarUrl
}

uni.redirectTo({url:'/NearbyBooksShare/index'})
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
