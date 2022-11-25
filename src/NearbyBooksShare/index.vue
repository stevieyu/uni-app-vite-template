<template>
  <page-meta>
    <navigation-bar
        title="附近图书"
    />
  </page-meta>
  <div class="min-h-screen">
    <near-books v-show="idx === 0"/>
    <my-books v-show="idx === 2" />
  </div>
  <tab-bar v-model:idx="idx"/>
</template>

<script setup>
import TabBar from "@/NearbyBooksShare/components/TabBar";
import NearBooks from "@/NearbyBooksShare/components/NearBooks";
import MyBooks from "@/NearbyBooksShare/components/MyBooks";

let idx = $ref(0)
</script>
