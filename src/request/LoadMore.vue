<template>
<slot :list="dataList"/>
<uni-load-more :status="moreStatus" @clickLoadMore="loadMore" v-if="!error"/>
</template>
<script setup>
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
    },
    map: {
        type: Function,
        default: null
    }
})

console.log(getApp());

const fetchData = async (ctx) => {
    let {page} = ctx || {};

    page = page ? page + 1 : 1;
    let list = await request.get(props.path, {page, ...props.query})
    if(props.map) list = list.map(props.map)
    return {
        list,
        page,
    }
}

const {dataList, loadMore, noMore, loading, error, mutate} = useLoadMore(fetchData, {
    refreshDeps: [props.query],
    refreshDepsAction: () => {
        mutate();
        loadMore()
    },
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
</script>