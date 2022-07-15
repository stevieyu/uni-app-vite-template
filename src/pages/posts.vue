<template>
<LoadMore path="https://dev.to/api/articles" :query="query">
    <template #default={list}>
        <uni-list>
            <uni-list-item v-for="item in list" :key="item.id"
                @click="onClick"
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

const query = $ref({
    top: 7
})

const onClick = () => {
    query.top = 4
}
</script>
