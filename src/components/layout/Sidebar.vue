<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";
import { computed, onMounted } from "vue";
import { useStore } from "@/store";
import LogoutSvg from "@/components/icons/LogoutSvg.vue";
const store = useStore();
const route = useRoute();
const user = computed(() => store.state.user);

const projectLinks = [
  {
    id: 1,
    name: "Project 1",
    path: "/project/1",
  },
  {
    id: 2,
    name: "Project 2",
    path: "/project/2",
  },
  {
    id: 3,
    name: "Project 3",
    path: "/project/3",
  },
  {
    id: 4,
    name: "Project 4",
    path: "/project/4",
  },
];

onMounted(() => {
  console.log("Sidebar mounted");
});
</script>

<template>
  <nav v-if="user.loggedIn" class="app-sidebar-container">
    <div class="app-sidebar-nav">
      <p class="name">Hello! | {{ user.data?.displayName }}</p>
      <p class="uid">{{ user.data?.uid }}</p>
      <h2 class="my-projects">My Projects</h2>
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

        <RouterLink to="/add-project" class="project">
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
