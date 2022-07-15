<template>
<slot :list="dataList"/>
<uni-load-more :status="moreStatus" @clickLoadMore="loadMore" />
</template>
<script setup>
import {watch} from 'vue'
import {useLoadMore} from 'vue-request'
import {onReachBottom} from '@dcloudio/uni-app';
import request from './index'

const props = defineProps({
    path: {
        type: String,
        required: true
    },
    query: {
        type: Object,
        default: () => ({})
    }
})

const fetchData = async ({page} = {}) => {
    page = page ? page + 1 : 1;
    return {
        list: await request.get(props.path, {page}),
        page,
    }
}

const {dataList, loadMore, noMore,loading, error} = useLoadMore(fetchData, {
//   manual: true,
    isNoMore: d => {
        return d?.list?.length % 10 > 0;
    },
});

onReachBottom(() => loadMore())

const moreStatus = $computed(() => {
    const arr = `more/loading/noMore`.split('/')
    if(noMore.value) return arr[2]
    if(loading.value) return arr[1]
    return arr[0]
})

watch(error, (val) => {
    console.error(val);
})

</script>