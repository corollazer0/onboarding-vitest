<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  if (props.disabled) return
  emit('click', event)
}
</script>

<template>
  <button
    class="btn"
    :class="`btn--${props.variant}`"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 600;
  cursor: pointer;
  background: #2563eb;
  color: #ffffff;
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.btn--secondary {
  background: #475569;
}

.btn--danger {
  background: #dc2626;
}
</style>
