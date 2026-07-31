<script setup>
defineProps({
  label: String,
  error: String,
  options: { type: Array, default: () => [] },
  optionValue: { type: String, default: 'id' },
  optionLabel: { type: String, default: 'name' },
  placeholder: { type: String, default: 'Pilih...' },
})

const model = defineModel({ default: '' })
</script>

<template>
  <div>
    <label v-if="label" class="label">{{ label }}</label>
    <select v-model="model" class="input" :class="{ 'input-error': error }">
      <option value="">{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt[optionValue]" :value="opt[optionValue]">
        {{ opt[optionLabel] }}
      </option>
    </select>
    <p v-if="error" class="mt-1 text-xs text-red-600 dark:text-red-400">{{ error }}</p>
  </div>
</template>
