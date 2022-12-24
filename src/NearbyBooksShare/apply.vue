<template>
  <page-meta>
    <navigation-bar
        title="图书借阅申请"
    />
  </page-meta>
  <view class="min-h-screen flex flex-col justify-between">
    <view>
      <view class="flex p-2 m-2 shadow rounded">
        <image :src="book.pic" class="w-12 h-auto block mr-2" mode="aspectFill"/>
        <view class="flex-auto">
          <view class="font-bold">{{ book.title }}</view>
          <view class="text-gray-500">
            {{ book.year }} {{ book.author_name }} {{ book.isbn }}
          </view>
          <view>分享备注: {{book.user?.remark}}</view>
        </view>
      </view>
      <view class="mx-2">
        <uni-forms>
          <uni-forms-item label="还书日期" label-width="100" name="remark">
            <uni-datetime-picker
                type="date"
                v-model="book.apply.return_data"
                :start="returnData.start"
                :end="returnData.end"
            />
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>
    <view class="m-2">
      <view class="mb-2">
        <uni-steps :options="[{title: '申请中'}, {title: '同意还书日期'}, {title: '同意地方时间'}, {title: '申请成功'}]" :active="0" />
      </view>
      <button type="primary" plain="true" :disabled="submitButton.disabled"
              @click="submitApply">
        提交
      </button>
    </view>
  </view>
</template>

<script setup>
import UserBooks from "@/NearbyBooksShare/models/UserBooks";
import Books from "@/NearbyBooksShare/models/Books";
import ApplyBooks from "@/NearbyBooksShare/models/ApplyBooks";
import {me} from "@/features/common/services/mpserverless";

const props = defineProps(['ubid'])

let book = $ref({
  apply: {}
})

const returnData = $computed(() => {
  const start = Date.now()
  const end = Date.now() + 1000 * 60 * 60 * 24 * 180
  return {start, end}
})
let my = $ref({})

Promise.all([
  UserBooks
      .findOne({
        _id: props.ubid,
      }),
  me()
])
    .then(async ([userBook, me]) => {
      my = me;
      const [apply, book] = await Promise.all([
        ApplyBooks.findOne({
          userbookid: userBook._id,
          auth: {
            userId: me.userId
          }
        }),
        Books.findOne({
          _id: userBook.bookid
        })
      ])
      book.user = userBook
      book.apply = apply || {}
      return book
    })
    .then(res => {
      book = res
    })
const submitButton = $computed(() => {
  const disabled = !book.apply.return_data
  return {disabled}
})
const submitApply = () => {
  const apply = {...book.apply}
  apply.userbookid = book.user._id
  if(!apply.status) apply.status = 1

  ApplyBooks.updateOne({
    userbookid: apply.userbookid,
    auth: {
      userId: my?.userId
    }
  }, {
    $set: apply
  }, {
    upsert: true,
  }).then(() => {

  })
}
</script>
