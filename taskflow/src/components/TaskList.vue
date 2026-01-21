<script setup>
import TaskItem from './TaskItem.vue'
import { storeToRefs } from 'pinia'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const { tasks } = storeToRefs(taskStore)
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
