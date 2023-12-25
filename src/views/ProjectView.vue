<script setup lang="ts">
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { watch, ref, onMounted } from "vue";
import { getProjectData } from "@/components/firebase/api/Projects";
import ProjectSection from "@/components/Section.vue";
import AddSection from "@/components/AddSection.vue";
import type { Project, Section } from "@/components/firebase/FirebaseTypes";
import { getProjectSections } from "@/components/firebase/api/Sections";

const router = useRouter();
const project = ref<Project | null>(null);
const sections = ref<Section[]>([]);

const handleSectionAdd = (section: Section) => {
  sections.value.push(section);
};

const fetchProjectData = async (projectId: string) => {
  try {
    const [projectData, projectSections] = await Promise.all([
      getProjectData(projectId),
      getProjectSections(projectId),
    ]);
    if (projectData) project.value = projectData;
    else router.push("/");
    console.log(projectSections);
    if (projectSections) sections.value = projectSections;
  } catch (err) {
    console.error(err);
  }
};

onMounted(() => {
  fetchProjectData(router.currentRoute.value.params.id as string);
});

onBeforeRouteUpdate((to) => {
  fetchProjectData(to.params.id as string);
});
</script>

<template>
  <div v-if="project" class="project-container">
    <h1 id="project-name">{{ project.projectName }}</h1>
    <div class="project-section-container">
      <ProjectSection
        v-for="section in sections"
        :key="section.sectionId"
        :section="section"
      />
      <AddSection @handle-section-add="handleSectionAdd" />
    </div>
  </div>
</template>

<style scoped>
#project-name {
  font-size: 1.5em;
  margin-bottom: 1em;
}
.project-container {
  height: 100vh;
  width: 100%;
  padding: 2em;
}
.project-section-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>
