<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const onBackdropClick = () => {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div v-if="props.isOpen" class="modal">
      <div class="modal__backdrop" @click="onBackdropClick"></div>
      <div class="modal__content">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
}

.modal__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 23, 42, 0.4);
}

.modal__content {
  position: relative;
  z-index: 1;
  min-width: 280px;
  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
}
</style>
