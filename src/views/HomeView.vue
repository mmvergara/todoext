<script setup lang="ts">
import { authStore } from "@/store/auth-store";
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
@/store/store
