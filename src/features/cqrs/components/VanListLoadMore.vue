<template>
  <van-pull-refresh
    v-model="prLoading"
    @refresh="onRefresh"
  >
    <van-list
      v-model:loading="loading"
      v-model:error="listIsError"
      :finished="noMore"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="loadMore"
    >
      <van-skeleton
        title
        avatar
        :row="3"
        v-show="!dataList || !dataList.length"
      />
      <slot :list="dataList" />
    </van-list>
  </van-pull-refresh>
</template>
<script setup>
// import {List as VanList, PullRefresh as VanPullRefresh, Skeleton as VanSkeleton} from 'vant';
import {useLoadMore} from 'vue-request';
import {onUpdated, watch} from 'vue';
import {onBeforeRouteLeave} from 'vue-router';
import request from '../query';

let storeScrollY = 0;
onBeforeRouteLeave(() => {
  storeScrollY = window.scrollY;
});
onUpdated(() => {
  if (storeScrollY > 0 && window.scrollY !== storeScrollY) {
    window.scrollTo(0, storeScrollY);
  }
});

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  search: {
    type: Object,
    default: null,
  },
  map: {
    type: [Function, null],
    default: null,
  },
});

const fetchData = async (ctx) => {
  const {path, search, map} = props;
  let {page} = ctx || {};

  page = page ? page + 1 : 1;
  let list = await request(path, {page, ...search});
  if (map) list = list.map(map);
  return {
    list,
    page,
  };
};

const refreshDeps = [];
if (props.search) refreshDeps.push(props.search);

const {dataList, refresh, loadMore, noMore, loading, error} = useLoadMore(fetchData, {
  refreshDeps,
  refreshDepsAction: () => onRefresh(),
  isNoMore: (d) => {
    return d?.list?.length % 10 > 0;
  },
  manual: true,
});

let prLoading = $ref(false);
watch(loading, (val) => {
  if (!val && prLoading) prLoading = false;
});

let listIsError = $ref(false);
watch(error, (val) => {
  if (val) listIsError = true;
});

const onRefresh = () => {
  refresh();
  storeScrollY = 0;
};
</script>
