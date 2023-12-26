<script setup lang="ts">
import {
  deleteProject,
  updateProjectName,
} from "@/components/firebase/api/Projects";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const projectId = computed(() => router.currentRoute.value.params.id as string);
const newProjectName = ref("");

const handleDeleteProject = async () => {
  try {
    await deleteProject(projectId.value);
    toast.success("Project Deleted");
    window.location.href = `/`;
  } catch (error) {
    toast.error("Something went wrong 😢");
  }
};

const handleUpdateProjectName = async () => {
  try {
    await updateProjectName(projectId.value, newProjectName.value);
    toast.success("Project Name Updated");
    window.location.href = `/project/${projectId.value}`;
  } catch (error) {
    toast.error("Something went wrong 😢");
  }
};
</script>

<template>
  <div class="project-settings-container">
    <h1>Project Settings | {{ projectId }}</h1>
    <div class="divider"></div>
    <form
      class="update-projectname-form"
      @submit.prevent="handleUpdateProjectName"
    >
      <h2>Update Project Name</h2>
      <input
        class="new-projectname-input"
        data-cy="new-projectname-input"
        type="text"
        placeholder="New Project Name"
        v-model="newProjectName"
      />
      <button
        data-cy="update-project-btn"
        class="update-project-btn"
        type="submit"
      >
        Update Project Name
      </button>
    </form>
    <div class="divider"></div>
    <h2>Delete Project</h2>
    <p>Deleting a project cannot be undone</p>
    <button
      data-cy="delete-project-btn"
      class="delete-project-btn"
      type="button"
      @click="handleDeleteProject"
    >
      Delete Project
    </button>
  </div>
</template>

<style scoped>
.project-settings-container {
  padding: 3em;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}

h1 {
  margin-bottom: 20px;
}

h2 {
  color: var(--gray-primary);
}

p {
  color: var(--gray-secondary);
}

.update-projectname-form {
  margin-bottom: 20px;
}

.new-projectname-input {
  font-family: "Inter", sans-serif;
  margin: 10px 0px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  background-color: var(--dark-secondary);
  color: white;
}

.update-project-btn {
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  background-color: var(--cyan-third);
  cursor: pointer;
  color: #fff;
}

.update-project-btn:hover {
  background-color: var(--cyan-secondary);
}

.delete-project-btn {
  margin-top: 10px;
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  background-color: #bd4337;
  color: #fff;
  cursor: pointer;
}

.delete-project-btn:hover {
  background-color: hsl(5, 55%, 50%);
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #545454;
  margin: 40px 0px;
  border-radius: 50%;
}
</style>
