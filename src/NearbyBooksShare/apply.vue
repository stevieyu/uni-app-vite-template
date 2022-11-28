<template>
  <page-meta>
    <navigation-bar
        title="图书借阅申请"
    />
  </page-meta>
  <view class="flex p-2 m-2 shadow rounded">
    <image :src="book.pic" class="w-12 h-auto block mr-2" mode="aspectFill"/>
    <view class="flex-auto">
      <view class="font-bold">{{ book.title }}</view>
      <view class="text-gray-500">
        {{ book.author_name }} {{ book.year }}
      </view>
    </view>
  </view>
<view>

</view>
</template>

<script setup>
const props = defineProps(['ubid'])

const book = $ref({})
</script>
