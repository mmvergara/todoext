<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useStore } from "@/store";
import { getProjects } from "../firebase/api/Projects";
import LogoutSvg from "@/components/icons/LogoutSvg.vue";

const store = useStore();
const route = useRoute();
const user = computed(() => store.state.user);
const isLoading = ref(true);
const projectLinks = ref<
  {
    id: string;
    name: string;
    path: string;
  }[]
>([]);

const fetchProjects = async () => {
  if (user.value.data) {
    isLoading.value = true;
    const projects = await getProjects(user.value.data.uid);
    projects.forEach((project) => {
      projectLinks.value.push({
        id: project.id,
        name: project.projectName,
        path: `/project/${project.id}`,
      });
    });
    isLoading.value = false;
  }
};
watchEffect(() => {
  console.log("updated");
  fetchProjects();
});
</script>

<template>
  <nav v-if="user.loggedIn" class="app-sidebar-container">
    <div class="app-sidebar-nav">
      <p class="name">Hello! | {{ user.data?.displayName }}</p>
      <p class="uid">{{ user.data?.uid }}</p>
      <h2 class="my-projects">My Projects 📒</h2>
      <section class="projects-list-container">
        <RouterLink
          v-for="project in projectLinks"
          :key="project.id"
          :to="project.path"
          class="project"
          :class="{ selected: route.fullPath === project.path }"
        >
          # {{ project.name }}
        </RouterLink>
        <div v-if="isLoading">
          <div class="skeleton"></div>
          <div class="skeleton"></div>
          <div class="skeleton"></div>
        </div>
        <RouterLink v-else to="/add-project" class="project">
          + Add Project
        </RouterLink>
      </section>
    </div>
    <button class="logout-btn" @click="store.dispatch('logOut')">
      <LogoutSvg /> <span> Logout </span>
    </button>
  </nav>
</template>

<style scoped>
/* Skeleton with effects */

.skeleton {
  background-color: var(--dark-primary);
  height: 30px;
  width: 100%;
  border-radius: 5px;
  margin: 5px 0px;
  animation: skeleton 1s ease-in-out infinite alternate;
}

@keyframes skeleton {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.app-sidebar-container {
  font-family: "Inter", sans-serif;
  padding: 20px;
  background-color: var(--dark-secondary);
  width: 320px;
  min-width: 320px;
  height: 100vh;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.199);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.app-sidebar-nav {
  display: flex;
  flex-direction: column;
}
.uid {
  font-size: small;
  border: none;
  color: var(--gray-primary);
  background-color: var(--dark-primary);

  text-align: center;
  padding: 3px;
  margin: 1em 0em;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn {
  background-color: var(--dark-primary);
  color: var(--gray-primary);
  font-weight: bold;
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.logout-btn svg {
  transform: scaleY(-1);
}

.logout-btn:hover {
  color: var(--logout-red);
}

/* Projects */

.projects-list-container {
  display: flex;
  flex-direction: column;
}
.my-projects {
  color: white;
  font-size: 1rem;
  padding: 2px 10px;
}
.project {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  color: var(--gray-primary);
  text-decoration: none;
}

.project:hover {
  background-color: #014858;
}

.project.selected {
  color: var(--cyan-primary);
}
</style>
