<script setup lang="ts">
import MainLayout from "../components/layout/MainLayout.vue";
import { RouterLink } from "vue-router";
</script>

<template>
  <MainLayout>
    <div>
      <h1>Home</h1>
      <RouterLink to="/auth">Auth</RouterLink>
    </div>
  </MainLayout>
</template>
@/store
