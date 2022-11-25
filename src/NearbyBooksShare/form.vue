<template>
  <page-meta>
    <navigation-bar
        title="图书添加"
    />
  </page-meta>
  <view>

  </view>
{{ form }}
</template>

<script setup>
import {findISBN} from "@/NearbyBooksShare/models/Books";
import useLocation from "@/features/common/services/useLocation";
import {watch} from "vue";

const props = defineProps(['q'])

if(!props.q) uni.navigateBack();

let form = $ref({
  remark: '',
  gps: { type: "Point", coordinates: [] }
})

const {location, err} = useLocation()
watch(location, (val) => {
  if(!val) return
  form.gps.coordinates = [val.longitude, val.latitude]
}, {immediate: true})



findISBN(props.q).then(res => {
  form.book = res
})

</script>