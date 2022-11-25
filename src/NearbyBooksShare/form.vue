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
import {getLocation} from "@/features/common/services/useLocation";
import {me} from "@/features/common/services/mpserverless";

const props = defineProps(['q'])

if(!props.q) uni.navigateBack();

let id = $ref(null)
let form = $ref({
  remark: '',
  gps: null
})


let book = $ref({})
findISBN(props.q)
    .then((res) => {
      book = res
      me().then(me => {
        UserBooks.findOne({
          bookid: book._id,
          auth: {
            userId: me.userId
          }
        }).then(res => {
          if(!res) return;
          id = res._id
          for (const k of 'remark,gps'.split(',')){
            form[k] = res[k]
          }
        })
      })
    })

const onSubmit = async () => {
  const data = {...form, bookid: book._id}

  try {
    const gps = await getLocation()
    form.gps = {
      type: "Point", coordinates: [gps.longitude, gps.latitude]
    }
  }catch (e){
    return uni.showToast({
      title: e.message,
      icon: 'none',
    })
  }

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