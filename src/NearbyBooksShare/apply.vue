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
                :disabled="!!book.apply.status"
            />
          </uni-forms-item>
          <template v-if="!isApplyUser">
            <uni-forms-item label="借书日期" label-width="100" name="remark">
              <uni-datetime-picker
                  type="date"
                  v-model="book.apply.trade_datetime"
                  :start="returnData.start"
                  :end="book.apply.return_data"
              />
            </uni-forms-item>
            <uni-forms-item label="借书地址" label-width="100" name="remark">
              <uni-easyinput type="textarea" autoHeight v-model="book.apply.trade_address" placeholder="请输入内容" />
            </uni-forms-item>
          </template>
        </uni-forms>
      </view>
    </view>
    <view class="m-2">
      <view class="mb-2">
        <uni-steps :options="[{title: '申请中'}, {title: '同意还书日期'}, {title: '同意地方时间'}, {title: '申请成功'}]" :active="0" />
      </view>
      <button type="primary" plain="true" v-if="!book.apply.status" :disabled="!book.apply.return_data"
              @click="submitApply">
        提交申请
      </button>
      <view class="flex" v-if="!isApplyUser && [1].includes(book.apply.status)" >
        <button plain="true"
                @click="submitRefuse">
          拒绝
        </button>
        <button type="primary" plain="true"
                :disabled="!book.apply.trade_address || !book.apply.trade_datetime"
                @click="submitAgree">
          同意
        </button>
      </view>
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
me().then(me => {
  my = me;
})

const isApplyUser = $computed(() => book.apply.auth?.userId === my?.userId)

UserBooks
    .findOne({
      _id: props.ubid,
    })
    .then(async (userBook) => {
      const [apply, book] = await Promise.all([
        ApplyBooks.findOne({
          userbookid: userBook._id,
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

const submitApply = () => {
  const apply = {...book.apply}
  apply.userbookid = book.user._id
  apply.status = 1

  submit(apply);
}

const submitRefuse = () => {
  const apply = {...book.apply}
  apply.status = 2

  submit(apply);
}
const submitAgree = () => {
  const apply = {...book.apply}
  apply.status = 3

  submit(apply);
}

const submit = (apply) => {
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
    uni.navigateBack();
  })
}
</script>
