<template>
<LoadMore path="https://dev.to/api/articles">
    <template #default={list}>
        <uni-list>
        <uni-list-item v-for="item in list" :key="item.id"
        clickable
        :title="item.title" 
        :note="item.description" 
        :thumb="item.cover_image"
        thumb-size="lg" />
        </uni-list>
    </template>
</LoadMore>
</template>

<script setup>
import LoadMore from '@/request/LoadMore.vue'
</script>
