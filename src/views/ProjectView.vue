<script setup lang="ts">
import EllipsisSvg from "@/components/icons/EllipsisSvg.vue";
import CircleCheckHollow from "@/components/icons/CircleCheckHollow.vue";
</script>

<template>
  <div class="project-container">
    <h1 id="project-name">Project Name</h1>
    <div class="project-section-container">
      <section class="project-section">
        <div class="section-container">
          <div class="section-header">
            <p class="section-name"># Section Name</p>
            <button class="section-settings" data-cy="section-settings-btn">
              <EllipsisSvg />
            </button>
          </div>
          <div class="task-container">
            <d class="task">
              <div>
                <button class="complete-task-btn">
                  <CircleCheckHollow />
                </button>
              </div>
              <p>
                Task Name asda sm,ld aslmjd lasd jasdl asljd asjld alsjd ajsdjl
                alsdj alsj djl
              </p>
            </d>
            <d class="task">
              <p>Task Name</p>
            </d>
            <d class="task">
              <p>Task Name</p>
            </d>
          </div>
        </div>
      </section>
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
.section-container {
  width: 320px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid transparent;
  transition: border 0.2s ease-in-out;
}
.section-container:hover {
  border: 1px solid #323232;
}

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

.task-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task {
  display: flex;
  flex-direction: row;
  background-color: var(--bg-sidebar);
  border: 1px solid #323232;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
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
</style>
