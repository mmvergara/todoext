<template>
  <nav v-if="user.loggedIn" class="app-sidebar-container">
    <div class="app-sidebar-nav">
      <p class="name">Hello! - {{ user.data?.displayName }}</p>
      <button class="uid">Copy UID</button>
    </div>
    <button class="logout-btn" @click="store.dispatch('logOut')">
      <LogoutSvg /> <span> Logout </span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
import LogoutSvg from "@/components/icons/LogoutSvg.vue";
const store = useStore();
const user = computed(() => store.state.user);
</script>

<style scoped>

.app-sidebar-container {
  font-family: "Inter", sans-serif;
  padding: 20px;
  background-color: var(--bg-sidebar);
  width: 320px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.app-sidebar-nav {
  display: flex;
  flex-direction: column;
}
.uid {
  border: none;
  color: var(--text-grayed-out);
  background-color: var(--bg-color);
  text-align: center;
  padding: 3px;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn {
  background-color: var(--bg-color);
  color: var(--text-grayed-out);
  font-weight: bold;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logout-btn svg {
  transform: scaleY(-1);
}

.logout-btn:hover {
  color: rgb(255, 130, 130);
}
</style>
