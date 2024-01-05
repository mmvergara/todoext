<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { getProjects } from "../firebase/api/Projects";
import LogoutSvg from "@/components/icons/LogoutSvg.vue";
import AddProject from "@/components/AddProject.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();
const user = computed(() => store.state.user);
const quote = ref("");

const fetchRandomQuote = async () => {
  const response = await fetch("http://api.quotable.io/random?maxLength=80");
  const data = await response.json();
  quote.value = data.content;
};
const isLoading = ref(true);
type ProjectLink = {
  id: string;
  name: string;
  path: string;
};
const projectLinks = ref<ProjectLink[]>([]);

const fetchProjects = async () => {
  isLoading.value = true;
  try {
    if (user.value.data) {
      const projects = await getProjects();
      projects.forEach((project) => {
        projectLinks.value.push({
          id: project.projectId,
          name: project.projectName,
          path: `/project/${project.projectId}`,
        });
      });
    }
  } catch (error) {
    console.log(error);
  }

  isLoading.value = false;
  //  Redirect to first project if no project is selected
  if (projectLinks.value.length > 0 && route.fullPath === "/") {
    router.push(projectLinks.value[0].path);
  }
};
// http://api.quotable.io/random?maxLength=80

const handleAddProject = async (project: ProjectLink) => {
  console.log(project);
  projectLinks.value.push(project);
};

watchEffect(() => {
  console.log("updated");
  fetchProjects();
  fetchRandomQuote();
});
</script>

<template>
  <nav v-if="user.loggedIn" class="app-sidebar-container">
    <div class="app-sidebar-nav">
      <p class="name">Hello! | {{ user.data?.displayName }}</p>
      <p class="uid">{{ user.data?.uid }}</p>
      <h2 class="my-projects-text">My Projects 📒</h2>
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
        <AddProject @handle-add-project="handleAddProject" />
      </section>
    </div>
    <div class="sidebar-footer">
      <p class="quote">{{ quote }}</p>

      <button class="logout-btn" @click="store.dispatch('logOut')">
        <LogoutSvg /> <span> Logout </span>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.app-sidebar-container {
  font-family: "Inter", sans-serif;
  padding: 20px;
  background-color: var(--dark-secondary);
  min-width: 320px;
  max-width: 320px;
  height: 100vh;
  box-shadow: 5px 0 20px rgba(0, 0, 0, 0.199);
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
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
  width: 100%;
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
.my-projects-text {
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

.sidebar-footer {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.quote {
  font-size: 0.8rem;
  color: var(--gray-primary);
  text-align: center;
  font-style: italic;
  text-wrap: wrap;
  margin: 0;
  padding: 0;
}
</style>
