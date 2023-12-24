<script setup lang="ts">
import EllipsisSvg from "@/components/icons/EllipsisSvg.vue";
import Task from "@/components/Task.vue";
import AddTask from "@/components/AddTask.vue";
</script>
<template>
  <div class="section-container">
    <div class="section-header">
      <p class="section-name"># Section Name</p>
      <button class="section-settings" data-cy="section-settings-btn">
        <EllipsisSvg />
      </button>
    </div>
    <div class="section-task-container">
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <Task />
      <AddTask />
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
