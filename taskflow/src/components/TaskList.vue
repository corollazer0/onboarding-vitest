<script setup>
import TaskItem from './TaskItem.vue'

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="task-list">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </section>
</template>

<style scoped>
.task-list {
  display: grid;
  gap: 12px;
}
</style>
