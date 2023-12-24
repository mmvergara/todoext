<script setup lang="ts">
import { useRouter } from "vue-router";
import { watchEffect } from "vue";
import { getProjectData } from "@/components/firebase/api/Projects";
import Section from "@/components/Section.vue";
import AddSection from "@/components/AddSection.vue";

const router = useRouter();
const projectId = router.currentRoute.value.params.id as string;

watchEffect(async () => {
  const data = await getProjectData(projectId);
  console.log(data);
});
</script>

<template>
  <div class="project-container">
    <h1 id="project-name">Project Name</h1>
    <div class="project-section-container">
      <Section />
      <Section />
      <Section />
      <AddSection />
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
