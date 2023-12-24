<script setup lang="ts">
import { ref } from "vue";

const sectionName = ref("");
const addSection = () => {
  console.log(sectionName.value);
};
</script>
<template>
  <form class="add-section-container" @submit.prevent="addSection">
    <input
      class="add-section-input"
      type="text"
      placeholder="Add New Section"
      v-model="sectionName"
    />
    <button
      v-if="sectionName.length !== 0"
      class="add-section-btn"
      type="submit"
    >
      Add Section
    </button>
  </form>
</template>

<style scoped>
.add-section-container {
  width: 320px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}

.add-section-input {
  font-family: "Inter", sans-serif;
  margin-bottom: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  background-color: var(--dark-secondary);
  color: white;
}

.add-section-btn {
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  width: 100%;
  background-color: var(--dark-primary);
  border: 2px solid var(--dark-secondary);
  color: #fff;
  cursor: pointer;
}

.add-section-btn:hover {
  background-color: #014858;
}
</style>
