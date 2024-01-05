<script setup lang="ts">
import type { Project, Section } from "@/components/firebase/FirebaseTypes";
import { watch, ref, onMounted, computed } from "vue";
import { getProjectSections } from "@/components/firebase/api/Sections";
import { getProjectData } from "@/components/firebase/api/Projects";
import { useRouter } from "vue-router";
import ProjectSection from "@/components/Section.vue";
import AddSection from "@/components/AddSection.vue";
import GearSvg from "@/components/icons/GearSvg.vue";

const router = useRouter();
const project = ref<Project | null>(null);
const sections = ref<Section[]>([]);

const projectId = computed(() => router.currentRoute.value.params.id);

const handleSectionAdd = (section: Section) => sections.value.push(section);

const fetchProjectData = async (projectId: string) => {
  console.log("fetching");
  try {
    const [projectData, projectSections] = await Promise.all([
      getProjectData(projectId),
      getProjectSections(projectId),
    ]);
    // if there is no such project with the given id, redirect to home
    if (projectData) project.value = projectData;
    else router.push("/");

    if (projectSections) sections.value = projectSections;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchProjectData(router.currentRoute.value.params.id as string);
});

watch(
  () => router.currentRoute.value.params.id,
  (projectId) => fetchProjectData(projectId as string)
);

const handleDeleteSection = (sectionId: string) => {
  console.log("From project view")
  sections.value = sections.value.filter(
    (section) => section.sectionId !== sectionId
  );
};
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
        v-for="section in sections"
        :key="section.sectionId"
        :section="section"
        @delete-section="handleDeleteSection"
      />
      <AddSection @handle-section-add="handleSectionAdd" />
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
