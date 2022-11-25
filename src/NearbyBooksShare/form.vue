<template>
  <page-meta>
    <navigation-bar
        title="图书添加"
    />
  </page-meta>
  <view class="flex p-2 m-2 shadow rounded">
    <image :src="book.pic" class="w-12 h-auto block mr-2" mode="aspectFill"/>
    <view class="flex-auto">
      <view class="font-bold">{{ book.title }}</view>
      <view class="text-gray-400">
        {{ book.author_name }} {{ book.year }}
      </view>
    </view>
  </view>
  <view class="mx-2">
    <uni-forms>
      <uni-forms-item label="备注" name="remark">
        <uni-easyinput type="textarea" autoHeight v-model="form.remark" />
      </uni-forms-item>
    </uni-forms>
  </view>
  <button @click="onSubmit" class="mx-2">提交</button>
</template>

<script setup>
import {findISBN} from "@/NearbyBooksShare/models/Books";
import UserBooks from "@/NearbyBooksShare/models/UserBooks";
import useLocation from "@/features/common/services/useLocation";
import {watch} from "vue";
import {me} from "@/features/common/services/mpserverless";

const props = defineProps(['q'])

if(!props.q) uni.navigateBack();

let id = $ref(null)
let form = $ref({
  remark: '',
  gps: null
})

const {location, err} = useLocation()
watch(location, (val) => {
  if(!val) return
  form.gps = {
    type: "Point", coordinates: [val.longitude, val.latitude]
  }
}, {immediate: true})


let book = $ref({})
findISBN(props.q).then(async (res) => {
  book = res
  UserBooks.findOne({
    bookid: book._id,
    auth: {
      userId: (await me()).userId
    }
  }).then(res => {
    id = res._id
    for (const k of 'remark,gps'.split(',')){
      form[k] = res[k]
    }
  })
})

const onSubmit = () => {
  const data = {...form, bookid: book._id}
  if(!data.gps) return uni.showToast({title: '位置信息获取失败，请开启手机位置信息'})

  UserBooks.updateOne({
    _id: id
  }, {
    $set: data
  }, {
    upsert: true,
  }).then(() => {
    uni.navigateBack()
  })
}
</script>