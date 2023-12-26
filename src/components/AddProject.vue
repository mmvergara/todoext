<script setup lang="ts">
import { ref, computed} from "vue";
import { useStore } from "@/store";
import { toast } from "vue3-toastify";
import { addProject } from "./firebase/api/Projects";
const emit = defineEmits(["handle-add-project"]);
const store = useStore();
const user = computed(() => store.state.user);

const projectName = ref("");
const isAddingProject = ref(false);
const toggleAddProject = () => (isAddingProject.value = !isAddingProject.value);
const submitProject = async () => {
  try {
    if (user.value.data) {
      const id = await addProject(projectName.value, user.value.data.uid);
      emit("handle-add-project", {
        id,
        name: projectName.value,
        path: `/project/${id}`,
      });
      toast.success("Project Added 🎉");
    }
    projectName.value = "";
    toggleAddProject();
  } catch (error) {
    toast.error("Something went wrong 😢");
  }
};
</script>

<template>
  <button v-if="!isAddingProject" @click="toggleAddProject" class="project btn">
    + Add Project
  </button>
  <form class="add-project-form" v-else @submit.prevent="submitProject">
    <input
      type="text"
      class="project-name-input"
      data-cy="project-name-input"
      v-model="projectName"
      placeholder="Project Name"
    />
    <div>
      <button
        type="submit"
        data-cy="add-project-btn"
        class="add-project-btn add"
      >
        Add
      </button>
      <button
        type="button"
        data-cy="add-project-btn"
        class="add-project-btn"
        @click="toggleAddProject"
      >
        Cancel
      </button>
    </div>
  </form>
</template>

<style scoped>
.project.btn {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  background-color: var(--gray-secondary);
  color: var(--gray-primary);
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.project.btn:hover {
  background-color: #014858;
}

.add-project-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.project-name-input {
  margin-bottom: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: var(--dark-primary);
  color: white;
}
.add-project-btn {
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  width: 50%;
  background-color: var(--dark-primary);
  border: 2px solid var(--dark-secondary);
  color: #fff;
  cursor: pointer;
}

.add-project-btn.add {
  background-color: var(--cyan-secondary);
}

.add-project-btn.add:hover {
  background-color: var(--cyan-third);
}

button:hover {
  background-color: #333;
}

button:active {
  background-color: #555;
}

button:focus {
  outline: none;
}
</style>
