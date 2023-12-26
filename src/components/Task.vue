<script setup lang="ts">
import CircleCheckHollow from "@/components/icons/CircleCheckHollow.vue";
import CircleCheckFilled from "@/components/icons/CircleCheckFilled.vue";
import type { PropType } from "vue";
import type { Task } from "./firebase/FirebaseTypes";
import { deleteTask } from "./firebase/api/Tasks";
import PopSound from "@/assets/sounds/pop.mp3";
import { toast } from "vue3-toastify";
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

const completeTaskHandler = () => {
  const audio = new Audio(PopSound);
  if (audio) {
    audio.volume = 0.3;
    audio.playbackRate = 0.8;
    audio.play();
  }
  toast.success("Task Completed! 🎉🎉🎉", {
    position: "top-center",
    autoClose: 1000,
  });
  deleteTask(props.projectId, props.sectionId, props.taskData.taskId);
};
</script>
<template>
  <div class="task">
    <div>
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
