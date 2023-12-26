<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";

const router = useRouter();
const projectId = router.currentRoute.value.params.id as string;
const newProjectName = ref("");

const handleDeleteProject = async () => {
  try {
    // await deleteProject(projectid);
    toast.success("Project Deleted 🎉");
    router.push("/");
  } catch (error) {
    toast.error("Something went wrong 😢");
  }
};

const handleUpdateProjectName = async () => {
  try {
    // await updateProjectName(projectid, projectName.value);
    toast.success("Project Name Updated 🎉");
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
        class="project-settings-input"
        type="text"
        placeholder="Project Name"
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
  color: var(--gray-primary);
}

.update-projectname-form {
  margin-bottom: 20px;
}

.project-settings-input {
  font-family: "Inter", sans-serif;
  margin-bottom: 5px;
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
  width: 100%;
  background-color: var(--dark-primary);
  border: 2px solid var(--dark-secondary);
  color: #fff;
}

.update-project-btn:hover {
  background-color: #014858;
}

.delete-project-btn {
  margin-top: 10px;
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  width: 100%;
  background-color: #bd4337;
  color: #fff;
  cursor: pointer;
}

.delete-project-btn:hover {
  background-color: hsl(5, 55%, 50%);
}

.divider {
  width: 100%;
  height: 2px;
  background-color: #545454;
  margin: 20px 0px;
  border-radius: 50%;
}
</style>