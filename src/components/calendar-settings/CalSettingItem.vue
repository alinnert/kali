<script lang="ts" setup>
type Props = { title: string }

defineProps<Props>()
</script>

<template>
  <div
    :class="[
      'grid grid-cols-[1fr,auto] gap-2',
      'p-3',
      'border border-gray-200 dark:border-gray-600',
      'bg-white dark:bg-gray-800',
      'rounded-lg',
      'select-none',
    ]"
  >
    <h2 class="font-bold text-sm">{{ title }}</h2>
    <div><slot name="inline" /></div>
    <div v-if="$slots.default" class="col-span-2 flex flex-col gap-2"><slot /></div>
  </div>
</template>
