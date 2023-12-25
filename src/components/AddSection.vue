<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { addSection } from "./firebase/api/Sections";

const router = useRouter();
const projectId = router.currentRoute.value.params.id as string;
const emit = defineEmits(["handle-section-add"]);

const sectionName = ref("");
const handleAddSection = async () => {
  try {
    const res = await addSection(projectId, sectionName.value);
    emit("handle-section-add", res);
    toast.success("Section Added 🎉");
  } catch (error) {
    toast.error("Something went wrong 😢");
  }
};
</script>
<template>
  <form class="add-section-container" @submit.prevent="handleAddSection">
    <input
      class="add-section-input"
      type="text"
      placeholder="Add New Section"
      v-model="sectionName"
    />
    <button
      v-if="sectionName.length !== 0"
      class="add-section-btn"
      type="submit"
    >
      Add Section
    </button>
  </form>
</template>

<style scoped>
.add-section-container {
  width: 320px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}

.add-section-input {
  font-family: "Inter", sans-serif;
  margin-bottom: 5px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
  background-color: var(--dark-secondary);
  color: white;
}

.add-section-btn {
  font-family: "Inter", sans-serif;
  padding: 10px;
  border-radius: 0.25rem;
  border: none;
  width: 100%;
  background-color: var(--dark-primary);
  border: 2px solid var(--dark-secondary);
  color: #fff;
  cursor: pointer;
}

.add-section-btn:hover {
  background-color: #014858;
}
</style>
