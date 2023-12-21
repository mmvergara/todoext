<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const projectName = ref("");

const addProject = async () => {
  const project = {
    name: projectName.value,
  };
};
</script>

<template>
  <div class="add-project-view">
    <h1>Add Project</h1>
    <form @submit.prevent="addProject">
      <input
        type="text"
        class="project-name-input"
        data-cy="project-name-input"
        v-model="projectName"
        placeholder="Project Name"
      />
      <button type="submit" data-cy="add-project-btn" class="add-project-btn">
        Add Project
      </button>
    </form>
  </div>
</template>

<style scoped>
.add-project-view {
  font-family: "Inter", sans-serif;
  height: 100%;
  width: 100%;
  padding: 2em;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}
label {
  margin-bottom: 0.5rem;
}
.project-name-input {
  margin-bottom: 1rem;
  padding: 1rem;
  width:320px;
  border: none;
  border-radius: 5px;
  background-color: var(--bg-sidebar);
  color: white;
}
.add-project-btn {
  padding: 1rem;
  border-radius: 0.25rem;
  border: none;
  width:320px;
  background-color: var(--bg-color);
  border: 2px solid var(--bg-sidebar);
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

button:active {
  background-color: #555;
}

button:focus {
  outline: none;
}
</style>
