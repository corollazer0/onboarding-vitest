<template>
  <main class="app">
    <header class="app__header">
      <h1 class="app__title">{{ title }}</h1>
      <p class="app__subtitle">Task management, step by step.</p>
    </header>
    <section class="app__content">
      <p>Project scaffold is ready. Next: tasks list.</p>
    </section>
  </main>
</template>

<style scoped>
.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 48px 24px;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #1f2933;
}

.app__title {
  margin: 0 0 8px;
  font-size: 32px;
  font-weight: 700;
}

.app__subtitle {
  margin: 0;
  color: #52606d;
}

.app__content {
  margin-top: 24px;
  padding: 16px;
  border: 1px solid #e4e7eb;
  border-radius: 12px;
  background: #f5f7fa;
}
</style>

<script setup>
const title = import.meta.env.VITE_APP_TITLE || 'TaskFlow'
</script>
