<script setup lang="ts">
import { computed } from 'vue'

type Props = { level?: number }

const { level = 1 } = defineProps<Props>()

const classNames = computed((): string => {
  if (level === 1) {
    return 'text-xl'
  }

  if (level === 2) {
    return 'text-sm font-semibold text-gray-600 dark:text-gray-300'
  }

  return ''
})
</script>

<template>
  <h1 class="select-none" :class="classNames"><slot /></h1>
</template>
