<script setup lang="ts">
import type { Project } from "@/components/firebase/FirebaseTypes";
import {
  deleteProject,
  updateProjectName,
  updateProjectKey,
  getProjectData,
} from "@/components/firebase/api/Projects";
import { computed, ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { generateProjectKey } from "@/utils/helpers";
const router = useRouter();
const revealProjectKey = ref(false);
const projectId = computed(() => router.currentRoute.value.params.id as string);
const newProjectName = ref("");
const isGeneratingNewProjectKey = ref(false);

const project = ref<Project | null>(null);

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
    console.log(error)
    toast.error("Something went wrong 😢");
  }
};

const handleGenerateNewProjectKey = async () => {
  if (!project.value) return;
  try {
    isGeneratingNewProjectKey.value = true;
    const newProjectKey = generateProjectKey(project.value?.projectName);
    await updateProjectKey(projectId.value, newProjectKey);
    isGeneratingNewProjectKey.value = false;
    project.value.projectKey = newProjectKey;
    toast.success("Project Key Updated");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong 😢");
  }
};

const handleRevealProjectKey = () => {
  revealProjectKey.value = !revealProjectKey.value;
};

const fetchProjectData = async (projectId: string) => {
  try {
    const projectData = await getProjectData(projectId);
    // if there is no such project with the given id, redirect to home
    if (projectData) project.value = projectData;
    else router.push("/");
  } catch (err) {
    console.log(err);
  }
};

onMounted(() => {
  fetchProjectData(router.currentRoute.value.params.id as string);
});

watch(
  () => router.currentRoute.value.params.id,
  (projectId) => fetchProjectData(projectId as string)
);
</script>

<template>
  <div class="project-settings-container">
    <h1>Project Settings | {{ projectId }}</h1>
    <div class="divider"></div>
    <h2>Project Key</h2>
    <p>
      sharing this key means you are sharing this project to those who have it
    </p>
    <button
      v-if="!revealProjectKey"
      v-on:click="handleRevealProjectKey"
      type="button"
      class="reveal-project-key-btn"
      data-cy="reveal-project-key-btn"
    >
      {{ "Reveal Project Key" }}
    </button>
    <p v-else class="project-key-btn" data-cy="project-key-btn">
      {{ isGeneratingNewProjectKey ? "....." : project?.projectKey }}
    </p>
    <button
      v-on:click="handleGenerateNewProjectKey"
      :disabled="isGeneratingNewProjectKey"
      type="button"
      class="generate-new-project-key-btn"
      data-cy="generate-new-project-key-btn"
    >
      {{
        isGeneratingNewProjectKey
          ? "Generating New Project Key..."
          : "Generate New Project Key"
      }}
    </button>
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

.reveal-project-key-btn,
.project-key-btn {
  width: 100%;
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  background-color: var(--dark-secondary);
  cursor: pointer;
  color: #fff;
  margin: 10px 0px;
  text-align: center;
}

.generate-new-project-key-btn {
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  background-color: var(--cyan-third);
  cursor: pointer;
  color: #fff;
  text-align: center;
}

.divider {
  width: 100%;
  height: 1px;
  background-color: #545454;
  margin: 40px 0px;
  border-radius: 50%;
}
</style>
