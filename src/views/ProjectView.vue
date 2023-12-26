<script setup lang="ts">
import type { Project, Section } from "@/components/firebase/FirebaseTypes";
import { watch, ref, onMounted } from "vue";
import { getProjectSections } from "@/components/firebase/api/Sections";
import { getProjectData } from "@/components/firebase/api/Projects";
import { useRouter } from "vue-router";
import ProjectSection from "@/components/Section.vue";
import AddSection from "@/components/AddSection.vue";

const router = useRouter();
const project = ref<Project | null>(null);
const sections = ref<Section[]>([]);

const handleSectionAdd = (section: Section) => {
  sections.value.push(section);
};

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
</script>

<template>
  <div v-if="project" class="project-main-container">
    <h1 id="project-name">{{ project.projectName }}</h1>
    <div class="project-container">
      <div class="project-section-container">
        <ProjectSection
          v-for="section in sections"
          :key="section.sectionId"
          :section="section"
        />
        <AddSection @handle-section-add="handleSectionAdd" />
      </div>
    </div>
  </div>
</template>

<style scoped>
#project-name {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.project-container {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
}

.project-main-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  overflow-x: hidden;
}
.project-section-container {
  flex-grow: 1;
  padding: 0em 1em;
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  height: 100%;
}
</style>
