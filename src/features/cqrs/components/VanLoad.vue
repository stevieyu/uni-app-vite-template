<template>
  <van-pull-refresh
    v-model="refreshLoading"
    @refresh="refresh"
  >
    <van-skeleton
      title
      :row="3"
      v-show="!data && !error"
    />
    <slot
      :data="data"
      v-if="data"
    />
    <van-empty
      image="error"
      description="请求失败, 点击重试"
      v-if="error"
      @click="refresh"
    />
  </van-pull-refresh>
</template>

<script setup>
// import {PullRefresh as VanPullRefresh, Skeleton as VanSkeleton, Empty as VanEmpty} from 'vant';
import {useRequest} from 'vue-request';
import {watch} from 'vue';
import request from '../query';

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

let refreshLoading = $ref(false);
watch(loading, (val) => {
  if (!val) refreshLoading = false;
});
</script>
