<script setup lang="ts">
import { ref } from "vue";
import { addTask } from "./firebase/api/Tasks";
import { toast } from "vue3-toastify";

const taskName = ref("");
const emit = defineEmits(["handle-task-add"]);
const props = defineProps({
  sectionId: {
    type: String,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
});

const addTaskHandler = async () => {
  if (taskName.value.length === 0) return;
  const lastTaskName = taskName.value;
  taskName.value = "";
  try {
    const res = await addTask(props.projectId, props.sectionId, lastTaskName);
    emit("handle-task-add", res);
  } catch (error) {
    taskName.value = lastTaskName;
    toast.error("Something went wrong");
    console.log(error);
  }
};
</script>

<template>
  <form class="add-task-container" @submit.prevent="addTaskHandler">
    <input
      class="add-task-input"
      type="text"
      placeholder="+ Add Task"
      v-model="taskName"
    />
    <button v-if="taskName.length !== 0" class="add-task-btn" type="submit">
      Add Task
    </button>
  </form>
</template>

<style scoped>
.add-task-container {
  width: 320px;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}

.add-task-input {
  font-family: "Inter", sans-serif;
  margin-bottom: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 302px;
  background-color: var(--dark-primary);
  color: white;
}

.add-task-input:focus {
  outline: none;
  background-color: var(--dark-secondary);
}

.add-task-btn {
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  width: 302px;
  background-color: var(--dark-primary);
  border: 2px solid var(--dark-secondary);
  color: #fff;
  cursor: pointer;
}

.add-task-btn:hover {
  background-color: var(--dark-secondary);
}

.blue {
  color: var(--cyan-primary);
}
</style>
