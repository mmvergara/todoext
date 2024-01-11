<script setup lang="ts">
import CircleCheckHollow from "@/components/icons/CircleCheckHollow.vue";
import CircleCheckFilled from "@/components/icons/CircleCheckFilled.vue";
import type { PropType } from "vue";
import { ref } from "vue";
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
  taskId: {
    type: String,
    required: true,
  },
});
const isChangingTaskName = ref(false);
const changeTaskNameInput = ref(props.taskData.taskName);
const changeTaskNameInputRef = ref<HTMLInputElement | null>(null);

const toggleIsChangingTaskName = () => {
  if (isChangingTaskName.value) {
    isChangingTaskName.value = false;
    changeTaskNameInput.value = props.taskData.taskName;
  } else {
    isChangingTaskName.value = true;
    setTimeout(() => {
      changeTaskNameInputRef.value?.focus();
    }, 0);
  }
};

const handleChangeTaskName = async () => {};

const completeTaskHandler = async () => {
  const audio = new Audio(PopSound);
  try {
    await deleteTask(props.projectId, props.sectionId, props.taskId);
    if (audio) {
      audio.volume = 0.2;
      audio.playbackRate = 1;
      audio.play();
    }
    toast.success("Task Completed! 🎉🎇🎉", {
      autoClose: 1500,
    });
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong 😢");
  }
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
    <button
      v-if="!isChangingTaskName"
      @click="toggleIsChangingTaskName"
      class="task-name"
      data-cy="task-name"
    >
      {{ props.taskData.taskName }}
    </button>
    <form v-else @submit.prevent="handleChangeTaskName">
      <input
        class="change-task-name-input"
        ref="changeTaskNameInputRef"
        @blur="toggleIsChangingTaskName"
        type="text"
        :value="changeTaskNameInput"
      />
    </form>
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
  /* drop shadow */

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.task:hover {
  box-shadow: 0px 4px 4px rgba(29, 65, 82, 0.293);
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
  background-color: transparent;
  border: none;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Apple Color Emoji", Helvetica, Arial, sans-serif, "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  padding: 2px;
}

.task-name:hover {
  text-decoration: underline;
  border-radius: 5px;
}

.change-task-name-input {
  width: 100%;
  background-color: var(--dark-primary);
  border: none;
  border-radius: 2px;
  padding: 5px;
  outline: none;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Apple Color Emoji", Helvetica, Arial, sans-serif, "Segoe UI Emoji",
    "Segoe UI Symbol";
  font-size: 16px;
}
</style>
