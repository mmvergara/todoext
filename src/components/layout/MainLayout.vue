<template>
  <main>
    <Sidebar />
    <slot></slot>
  </main>
</template>

<script setup lang="ts">
import Sidebar from "./Sidebar.vue";
</script>

<style scoped>
main {
  color: white;
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
}
</style>
