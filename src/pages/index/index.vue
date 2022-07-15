<template>
  <view class="content">

    <uni-forms label-position="top">
			<uni-forms-item label="a" name="a">
				<uni-easyinput type="text" placeholder="a" />
			</uni-forms-item>
			<uni-forms-item label="b" name="b">
				<uni-easyinput type="text" placeholder="b" />
			</uni-forms-item>
			<uni-forms-item label="c" name="c">
				<uni-easyinput type="text" placeholder="c" />
			</uni-forms-item>
		</uni-forms>

    <image class="logo" src="/static/logo.png"></image>
    <navigator url="/moduleA/pages/index">
      <view class="text-area">
        <text class="title">{{ title }}</text>
      </view>
    </navigator>
    <AaBb />
  </view>
</template>

<script setup>
import AaBb from "@/components/AaBb.vue";

const title = 'Hello word'

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
