<script setup lang="ts">
import EllipsisSvg from "@/components/icons/EllipsisSvg.vue";
import Task from "@/components/Task.vue";
import AddTask from "@/components/AddTask.vue";
import type {
  Section,
  Task as TaskData,
} from "@/components/firebase/FirebaseTypes";
import { ref, type PropType, onUnmounted } from "vue";
import { doc, onSnapshot } from "firebase/firestore";
import { FirestoreMain } from "./firebase/Firebase";
import { useRouter } from "vue-router";

const router = useRouter();
const projectId = router.currentRoute.value.params.id as string;

const props = defineProps({
  section: {
    type: Object as PropType<Section>,
    required: true,
  },
});

const section = ref<Section>(props.section);
const unsub = onSnapshot(
  doc(
    FirestoreMain,
    "projects",
    projectId,
    "sections",
    props.section.sectionId
  ),
  (doc) => {
    let data = doc.data() as Section | undefined;
    if (!data) return;
    data.sectionId = doc.id;
    section.value = data;
  }
);

onUnmounted(() => {
  console.log("unsub");
  unsub();
});
</script>
<template>
  <div class="section-container">
    <div class="section-header">
      <p class="section-name"># {{ section.sectionName }}</p>
      <button class="section-settings" data-cy="section-settings-btn">
        <EllipsisSvg />
      </button>
    </div>
    <div class="section-task-container">
      <Task
        v-for="task in section.tasks"
        :key="task.taskId"
        :task-data="task"
        :project-id="projectId"
        :section-id="section.sectionId"
      />
      <AddTask :project-id="projectId" :section-id="section.sectionId" />
    </div>
  </div>
</template>

<style scoped>
.section-container {
  width: 320px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}
/* .section-container:hover {
  border: 1px solid #323232;
} */

.section-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  padding-inline: 5px;
}
.section-name {
  font-family: "Inter", sans-serif;
  font-weight: bold;
  font-size: 1.2em;
}

.section-settings {
  background-color: transparent;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 7px;
  padding: 0px 5px;
  padding-top: 3px;
}

.section-settings:hover {
  background-color: #323232;
}

.section-task-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
