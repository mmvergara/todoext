<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";
import { FirebaseAuth } from "./components/firebase/Firebase";
import { useStore } from "@/store";
import { ref } from "vue";
const store = useStore();
const router = useRouter();

const isLoading = ref(true);
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
});
</script>

<template>
  <!-- Display Router view if not loading -->
  <div v-if="!isLoading">
    <RouterView />
  </div>
</template>
