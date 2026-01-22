<script setup>
import { ref } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'

const emit = defineEmits(['submit'])

const title = ref('')
const hasError = ref(false)

const onSubmit = () => {
  if (!title.value.trim()) {
    hasError.value = true
    return
  }

  emit('submit', title.value.trim())
  title.value = ''
  hasError.value = false
}
</script>

<template>
  <form class="task-form" @submit.prevent="onSubmit">
    <BaseInput
      v-model="title"
      :invalid="hasError"
      placeholder="Enter a task"
    />
    <BaseButton type="submit">Add Task</BaseButton>
  </form>
</template>

<style scoped>
.task-form {
  display: grid;
  gap: 12px;
}
</style>
