<script setup>
import TaskList from '@/components/TaskList.vue'
</script>

<template>
  <section class="view">
    <h2 class="view__title">Home</h2>
    <TaskList />
  </section>
</template>

<style scoped>
.view {
  display: grid;
  gap: 16px;
}

.view__title {
  margin: 0;
  font-size: 24px;
}
</style>
