<script setup>
defineProps({
  label: String,
  error: String,
  placeholder: String,
  rows: { type: Number, default: 3 },
})

const model = defineModel({ default: '' })
</script>

<template>
  <div>
    <label v-if="label" class="label">{{ label }}</label>
    <textarea
      v-model="model"
      :placeholder="placeholder"
      :rows="rows"
      class="input resize-none"
      :class="{ 'input-error': error }"
    />
    <p v-if="error" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>
