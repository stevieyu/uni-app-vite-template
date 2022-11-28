<template>
  <div class="min-h-screen flex flex-col">
    <near-books class="flex-auto" v-if="idx === 0"/>
    <my-books class="flex-auto" v-if="idx === 2" />
    <tab-bar v-model:idx="idx"/>
  </div>
</template>

<script setup>
import TabBar from "@/NearbyBooksShare/components/TabBar";
import NearBooks from "@/NearbyBooksShare/components/NearBooks";
import MyBooks from "@/NearbyBooksShare/components/MyBooks";

let idx = $ref(0)
</script>
