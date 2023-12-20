<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "@/store";
const store = useStore();
const user = computed(() => store.state.user);
</script>
<template>
  <main>
    <nav v-if="user.loggedIn" class="app-sidebar-container">
      <div v-if="user.loggedIn">
        <h1>{{ user.data?.displayName }}</h1>
        <button @click="store.dispatch('logOut')">Log Out</button>
      </div>
      <div v-else>
        <h1>Not Logged In</h1>
        <button @click="store.dispatch('logInWithGoogle')">
          Log In With Google
        </button>
      </div>
    </nav>
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
