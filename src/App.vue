<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { FirebaseAuth } from "./components/firebase/Firebase";
import { useStore } from "@/store";
import { ref } from "vue";
import MainLayout from "./components/layout/MainLayout.vue";
const store = useStore();
const router = useRouter();

const isLoading = ref(true);
const isLoading2 = ref(true);
FirebaseAuth.onAuthStateChanged(async (user) => {
  store.dispatch("fetchUser", user);

  // if the user is logged in, redirect to the home page
  if (user) {
    router.push("/");
  }

  // if the user is not logged in, redirect to the auth page
  if (!user) {
    router.push("/auth");
  }
  isLoading.value = false;
  setTimeout(() => {
    isLoading2.value = false;
  }, 1000);
});
</script>

<template>
  <!-- Display loading screen if loading -->
  <div
    v-if="isLoading2"
    class="loading-screen"
    :class="{ 'fade-out': !isLoading }"
  >
    <h1 v-if="isLoading">Todoext</h1>
    <div v-if="isLoading" class="loader"></div>
  </div>
  <MainLayout>
    <RouterView />
  </MainLayout>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  display: flex;
  align-items: center;
  padding-top: 10vh;
  flex-direction: column;
  gap: 40px;
  height: 100vh;
  width: 100vw;
  background-color: hsl(0, 0%, 10%);
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  color: white;
}

.loading-screen.fade-out {
  opacity: 0;
}

.loader {
  border: 3px solid #f3f3f3; /* Light grey */
  border-top: 3px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
