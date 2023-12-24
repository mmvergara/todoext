<script setup lang="ts">
import CircleCheckHollow from "@/components/icons/CircleCheckHollow.vue";
import CircleCheckFilled from "@/components/icons/CircleCheckFilled.vue";
import { ref, type PropType } from "vue";
import type { Task } from "./firebase/FirebaseTypes";
import { deleteTask } from "./firebase/api/Tasks";

const props = defineProps({
  taskData: {
    type: Object as PropType<Task>,
    required: true,
  },
  projectId: {
    type: String,
    required: true,
  },
  sectionId: {
    type: String,
    required: true,
  },
});

const audio = ref<HTMLAudioElement | null>(null);
const completeTaskHandler = () => {
  if (audio.value) {
    audio.value.play();
  }
  deleteTask(props.projectId, props.sectionId, props.taskData.taskId);
};
</script>
<template>
  <div class="task">
    <div>
      <audio hidden="true" ref="audio">
        <source src="./pop-sound.mp3" type="audio/mpeg" />
      </audio>
      <button class="complete-task-btn" @click="completeTaskHandler">
        <div class="CircleCheckHollow">
          <CircleCheckHollow />
        </div>
        <div class="CircleCheckFilled">
          <CircleCheckFilled class="CircleCheckFilled" />
        </div>
      </button>
    </div>
    <p class="task-name">{{ props.taskData.taskName }}</p>
  </div>
</template>

<style scoped>
.task {
  display: flex;
  flex-direction: row;
  background-color: var(--dark-secondary);
  border: 1px solid #323232;
  border-radius: 5px;
  padding: 10px;
}

.task:hover {
  background-color: #323232;
}

.complete-task-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-top: 3px;
  margin-right: 5px;
}
.CircleCheckHollow {
  z-index: -1;
}
.complete-task-btn {
  position: relative;
}

.CircleCheckFilled {
  display: none;
}

.complete-task-btn:hover .CircleCheckFilled {
  display: block;
}

.complete-task-btn:hover .CircleCheckHollow {
  display: none;
  opacity: 0;
}

.task-name {
  margin-top: 1px;
  margin-left: 2px;
}
</style>
