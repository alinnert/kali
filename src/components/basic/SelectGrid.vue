<script setup lang="ts" generic="VALUE extends string">
export type SelectGridItem<V> = { value: V; label: string }

type Props = {
  items: SelectGridItem<VALUE>[]
}

defineProps<Props>()
defineModel<VALUE | null>('selectedItem', { required: true })
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <div
      v-for="item in items"
      :key="item.value"
      :class="[
        'p-3 text-sm text-center content-center',
        'bg-white',
        'border',
        'rounded-lg',
        {
          'bg-sky-100 dark:bg-sky-700': selectedItem === item.value,
          'border-sky-300 dark:border-sky-500': selectedItem === item.value,
          'bg-white dark:bg-gray-800': selectedItem !== item.value,
          'border-gray-200 dark:border-gray-600': selectedItem !== item.value,
        },
      ]"
      @click="$emit('update:selectedItem', item.value)"
    >
      {{ item.label }}
    </div>
  </div>
</template>
