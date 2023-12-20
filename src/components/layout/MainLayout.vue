<script setup lang="ts">
import { computed } from "vue";
import { FirebaseAuth } from "../firebase/Firebase";
import { useStore } from "@/store";
const store = useStore();

FirebaseAuth.onAuthStateChanged((user) => {
  store.dispatch("fetchUser", user);
});

const user = computed(() => {
  return store.state.user;
});
</script>
<template>
  <main>
    <nav class="app-sidebar-container">qsdasd</nav>
    <slot></slot>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
}

.app-sidebar-container {
  background-color: var(--bg-sidebar);
  width: 300px;
  height: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
