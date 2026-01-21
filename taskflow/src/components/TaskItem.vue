<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="task-item">
    <span class="task-item__title">{{ task.title }}</span>
  </article>
</template>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border: 1px solid #e4e7eb;
  border-radius: 10px;
  background: #ffffff;
}

.task-item__title {
  font-weight: 600;
  color: #1f2933;
}
</style>
