<template>
  <uni-list>
    //////
    <uni-list-item  title="列表文字" ></uni-list-item>
    <uni-list-item :disabled="true" title="列表禁用状态" ></uni-list-item>
  </uni-list>
</template>

<script setup>
import useLocation from "@/features/common/services/useLocation";

const {location} = useLocation()
</script>
