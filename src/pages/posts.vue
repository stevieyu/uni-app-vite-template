<template>
<LoadMore path="https://dev.to/api/articles">
    <template #default={item}>
        <uni-list-item 
        :title="item.title" 
        :note="item.description" 
        :thumb="item.cover_image"
        thumb-size="lg" />
    </template>
</LoadMore>
</template>

<script setup>
import LoadMore from '@/request/LoadMore.vue'
</script>
