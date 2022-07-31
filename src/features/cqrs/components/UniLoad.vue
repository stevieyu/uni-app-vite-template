<template>
<slot :data="data"/>
</template>
<script setup>
import {useRequest} from 'vue-request';
import request from '../query';
import refreshEventBus from "@/features/cqrs/refreshEventBus";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  search: {
    type: Object,
    default: null,
  },
});

const defaultParams = [props.path, props.search].filter((i) => !!i);
const {data, refresh, loading, error} = useRequest(request, {
  defaultParams,
  refreshOnWindowFocus: true,
  refocusTimespan: 2 * 1000, // ms
  cacheKey: () => `show-${JSON.stringify(defaultParams).replace(/["|:|{|}|,]/g, '')}`,
});

refreshEventBus.on(refresh)
</script>