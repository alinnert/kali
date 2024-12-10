<script setup lang="ts">
import { computed } from 'vue'

type Props = { level?: number }

const { level = 1 } = defineProps<Props>()

const classNames = computed((): string => {
  if (level === 1) {
    return 'text-2xl font-bold'
  }

  if (level === 2) {
    return 'font-bold text-sky-600 dark:text-sky-300 [&:not(h1+&)]:mt-12'
  }

  return ''
})
</script>

<template>
  <component :is="`h${level}`" class="mb-2" :class="classNames"><slot></slot></component>
</template>
