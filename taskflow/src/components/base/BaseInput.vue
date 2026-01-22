<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  invalid: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <input
    class="input"
    :class="{ 'input--invalid': props.invalid }"
    :value="props.modelValue"
    :placeholder="props.placeholder"
    @input="onInput"
  />
</template>

<style scoped>
.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #cbd2d9;
  font-size: 14px;
}

.input--invalid {
  border-color: #dc2626;
}
</style>
