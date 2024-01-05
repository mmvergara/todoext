<script setup lang="ts">
import EllipsisSvg from "@/components/icons/EllipsisSvg.vue";
import Task from "@/components/Task.vue";
import AddTask from "@/components/AddTask.vue";
import type { Section } from "@/components/firebase/FirebaseTypes";
import { ref, type PropType, onUnmounted, computed } from "vue";
import {
  deleteSection,
  updateSectionName,
} from "@/components/firebase/api/Sections";
import { doc, onSnapshot } from "firebase/firestore";
import { FirestoreMain } from "./firebase/Firebase";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
const props = defineProps({
  section: {
    type: Object as PropType<Section>,
    required: true,
  },
  onDeleteSection: {
    type: Function as PropType<(sectionId: string) => void>,
    required: true,
  },
});
const router = useRouter();
const section = ref<Section>(props.section);
const changeNameInput = ref(section.value.sectionName);
const isChangingSectionName = ref(false);
const changeSectionNameInputRef = ref<HTMLInputElement | null>(null);
const projectId = computed(() => router.currentRoute.value.params.id as string);

const toggleSectionNameChange = () => {
  if (isChangingSectionName.value) {
    isChangingSectionName.value = false;
  } else {
    console.log("is changing section name");
    isChangingSectionName.value = true;
    setTimeout(() => {
      changeSectionNameInputRef.value?.focus();
    }, 0);
  }
};

const handleChangeSectionName = async () => {
  if (changeNameInput.value === "") return;
  if (changeNameInput.value === section.value.sectionName) {
    isChangingSectionName.value = false;
    return;
  }
  try {
    await updateSectionName(
      projectId.value,
      section.value.sectionId,
      changeNameInput.value
    );
    isChangingSectionName.value = false;
    toast.success("Section Name Updated");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong 😢");
  }
};

const handleDeleteSection = async () => {
  try {
    await deleteSection(projectId.value, section.value.sectionId);
    props.onDeleteSection(section.value.sectionId);
    toast.success("Section Deleted");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong 😢");
  }
};

const unsub = onSnapshot(
  doc(
    FirestoreMain,
    "projects",
    projectId.value,
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
      <button
        v-if="!isChangingSectionName"
        data-cy="change-section-name-btn"
        @click="toggleSectionNameChange"
        class="section-name"
      >
        # {{ section.sectionName }}
      </button>
      <div v-else class="update-section-container">
        <form @submit.prevent="handleChangeSectionName">
          <input
            ref="changeSectionNameInputRef"
            class="section-name section-name-change-input"
            v-model="changeNameInput"
            type="text"
            style="max-width: 230px"
          />
        </form>
        <div class="update-section-buttons">
          <button
            @click="handleChangeSectionName"
            class="change-section-name-btn"
            type="button"
          >
            Change Name
          </button>

          <button
            @click="handleDeleteSection"
            class="delete-section-btn"
            type="button"
          >
            Delete Section
          </button>
        </div>
      </div>
      <button
        @click="toggleSectionNameChange"
        data-cy="section-settings-btn"
        class="section-settings"
        type="button"
      >
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
  <div class="padding"></div>
</template>

<style scoped>
.section-container {
  width: 320px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}

.padding {
  min-width: 10px;
  max-width: 10px;
  height: 100%;
  flex: 1;
}

.section-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 5px;
  margin-bottom: 5px;
}

.section-name {
  background-color: transparent;
  border: none;
  color: white;
  font-family: "Inter", sans-serif;
  font-weight: bold;
  font-size: 1.2em;
  cursor: pointer;
  padding: 3px;
}

.section-name-change-input {
  background-color: var(--dark-secondary);
  border: none;
  border-radius: 5px;
  padding: 5px;
  outline: none;
}

.section-name:hover {
  background-color: #323232;
}

.section-settings {
  display: flex;
  flex-direction: row;
  height: 100%;
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

.update-section-container {
  display: flex;
  flex-direction: columns;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 5px;
}

.update-section-buttons {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.change-section-name-btn {
  font-family: "Inter", sans-serif;
  border: none;
  border-radius: 3px;
  background-color: var(--cyan-third);
  cursor: pointer;
  color: #fff;
  padding: 10px;
}

.change-section-name-btn:hover {
  background-color: var(--cyan-secondary);
}

.delete-section-btn {
  font-family: "Inter", sans-serif;
  border: none;
  border-radius: 3px;
  background-color: #bd4337;
  color: #fff;
  cursor: pointer;
  padding: 10px;
}

.delete-section-btn:hover {
  background-color: #a73a2e;
}
</style>
