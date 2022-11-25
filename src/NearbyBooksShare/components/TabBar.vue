<template>
  <div class="flex bottom-0 sticky">
    <div v-for="(i, idx) in list" :key="i.text" class="flex-1"
         :class="activeIdx === idx ? 'text-sky-500' : ''"
         @click="click(i)"
    >
      <div :class="i.icon" class="mx-auto text-4xl"></div>
      <div class="text-center">{{i.text}}</div>
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(['update:idx'])

const list = []
list.push({
  icon: 'i-mdi:bookshelf',
  text: '附近',
})
list.push({
  icon: 'i-iconoir:scan-barcode',
  text: '添加',
  click: () => {
    wx.scanCode({
      scanType: ['barCode'],
    })
        .catch(() => ({result: '9787119069081'}))
        .then(({result}) => uni.navigateTo({url: '/NearbyBooksShare/form?q=' + result}))
  }
})
list.push({
  icon: 'i-mdi:book-plus-multiple',
  text: '我的',
})

let activeIdx = $ref(0)
const click = (i = null) => {
  if(i.click) return i.click();
  activeIdx = list.findIndex(ii => ii.text === i.text)
  emits('update:idx', activeIdx)
}
</script>
