<script setup>
defineProps({
  label: String,
  error: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  min: [Number, String],
  max: [Number, String],
})

const model = defineModel({ type: [String, Number], default: '' })
</script>

<template>
  <div>
    <label v-if="label" class="label">{{ label }}</label>
    <input
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      class="input"
      :class="{ 'input-error': error }"
    />
    <p v-if="error" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>
