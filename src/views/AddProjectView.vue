<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "@/store";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { addProject } from "@/components/firebase/api/Projects";
const store = useStore();
const projectName = ref("");

const user = computed(() => store.state.user);

const isLoading = ref(false);

const handleAddProject = async () => {
  isLoading.value = true;
  try {
    if (user.value.data) {
      await addProject(projectName.value, user.value.data.uid);
    }
    toast.success("Project Added 🎉");
  } catch (error) {
    toast.error("Something went wrong 😢");
  }
  isLoading.value = false;
};
</script>

<template>
  <div class="add-project-view">
    <h1>Add Project</h1>
    <form @submit.prevent="handleAddProject">
      <input
        type="text"
        class="project-name-input"
        data-cy="project-name-input"
        v-model="projectName"
        placeholder="Project Name"
      />
      <button
        :disabled="isLoading"
        type="submit"
        data-cy="add-project-btn"
        class="add-project-btn"
      >
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
  width: 320px;
  border: none;
  border-radius: 5px;
  background-color: var(--dark-secondary);
  color: white;
}
.add-project-btn {
  padding: 1rem;
  border-radius: 0.25rem;
  border: none;
  width: 320px;
  background-color: var(--dark-primary);
  border: 2px solid var(--dark-secondary);
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
