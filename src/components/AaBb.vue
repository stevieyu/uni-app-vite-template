<template>
  <swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
          :duration="duration">
    <swiper-item>
      <view class="swiper-item uni-bg-red">A{{duration}}</view>
    </swiper-item>
    <swiper-item>
      <view class="swiper-item uni-bg-green">B{{duration}}</view>
    </swiper-item>
    <swiper-item>
      <view class="swiper-item uni-bg-blue">C{{duration}}</view>
    </swiper-item>
  </swiper>
</template>

<script>
export default {
  data() {
    return {
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500
    }
  },
  methods: {
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay
    },
    intervalChange(e) {
      this.interval = e.target.value
    },
    durationChange(e) {
      this.duration = e.target.value
    }
  }
}
</script>
<style lang="scss">
.swiper {
  height: 300rpx;
  width: 90vw;
}
.swiper-item {
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}
.uni-bg-red{
  background: red;
}
.uni-bg-green{
  background: green;
}
.uni-bg-blue{
  background: blue;
}
</style>