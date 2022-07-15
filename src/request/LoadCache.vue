<template>
<slot :item="item"/>

</template>
<script setup>
import {useRequest} from 'vue-request'
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

const {data, loading} = useRequest(fetchData, {
    cache: true,
//   manual: true,
    isNoMore: d => {
        return d?.list?.length % 10 > 0;
    },
});
</script>