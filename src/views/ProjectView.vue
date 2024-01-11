<script setup lang="ts">
import type { Project, Section } from "@/components/firebase/FirebaseTypes";
import { watch, ref, computed } from "vue";
import { useRouter } from "vue-router";
import ProjectSection from "@/components/Section.vue";
import AddSection from "@/components/AddSection.vue";
import GearSvg from "@/components/icons/GearSvg.vue";
import type { Unsubscribe } from "firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";
import { FirestoreMain } from "@/components/firebase/Firebase";

const router = useRouter();
const project = ref<Project | null>(null);
const projectSections = computed(() => {
  // Sort by createdAt
  const sections = Object.entries(project.value?.sections || {}).sort(
    (a, b) => a[1].createdAt.seconds - b[1].createdAt.seconds
  );
  return sections;
});
const projectId = computed(() => router.currentRoute.value.params.id);

const unsub = ref<Unsubscribe>(
  onSnapshot(doc(FirestoreMain, `projects/${projectId.value}`), (doc) => {
    project.value = doc.data() as Project;
  })
);

watch(
  () => router.currentRoute.value.params.id,
  (projectId) => {
    unsub.value();
    unsub.value = onSnapshot(
      doc(FirestoreMain, `projects/${projectId}`),
      (doc) => {
        project.value = doc.data() as Project;
      }
    );
  }
);
</script>

<template>
  <div v-if="project" class="project-main-container">
    <div class="project-header">
      <h1 id="project-name">{{ project.projectName }}</h1>
      <RouterLink
        :to="`/project/${projectId}/settings`"
        class="project-settings-btn"
        ><GearSvg
      /></RouterLink>
    </div>
    <div class="project-section-container">
      <ProjectSection
        v-for="[sectionId, section] of projectSections"
        :key="sectionId"
        :section-id="String(sectionId)"
        :section="section"
      />
      <AddSection />
    </div>
  </div>
</template>

<style scoped>
#project-name {
  font-size: 1.5em;
}

.project-main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  overflow-x: hidden;
}

.project-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 2em 3em;
}

.project-settings-btn {
  font-family: "Inter", sans-serif;
  padding: 13px 14px 10px 14px;
  border-radius: 0.25rem;
  background-color: var(--dark-primary);
  color: white;
  cursor: pointer;
}

.project-settings-btn:hover {
  background-color: var(--dark-secondary);
}

.project-section-container {
  flex-grow: 1;
  padding: 0em 2em;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  height: 100%;
}
</style>
