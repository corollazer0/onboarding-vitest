<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const taskId = computed(() => Number(route.params.id))
</script>

<template>
  <section class="view">
    <h2 class="view__title">Task Detail</h2>
    <p class="view__description">Task ID: {{ taskId }}</p>
  </section>
</template>

<style scoped>
.view {
  display: grid;
  gap: 12px;
}

.view__title {
  margin: 0;
  font-size: 24px;
}

.view__description {
  margin: 0;
  color: #52606d;
}
</style>
