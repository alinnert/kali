<script setup lang="ts" generic="VALUE extends string | number">
import { Circle, CircleCheckBig } from 'lucide-vue-next'

export type SelectListItem<V> = { value: V; label: string }

type Props = {
  items: SelectListItem<VALUE>[]
}

defineProps<Props>()
const selectedItem = defineModel<VALUE>('selectedItem', { required: true })

function isSelected<V extends VALUE>(item: SelectListItem<V>): boolean {
  return item.value === selectedItem.value
}
</script>

<template>
  <div class="flex flex-col gap-0.5">
    <div
      v-for="item in items"
      :key="item.value"
      :class="[
        'grid grid-cols-[auto,1fr] items-center gap-2',
        'p-1',
        'rounded',
        {
          'dark:bg-sky-900': isSelected(item),
          'hover:bg-gray-100 dark:hover:bg-gray-700': !isSelected(item),
        },
      ]"
      @click="$emit('update:selectedItem', item.value)"
    >
      <div class="grid p-1">
        <CircleCheckBig v-if="isSelected(item)" />
        <Circle v-else class="text-gray-300 dark:text-gray-500" />
      </div>
      <div
        class="text-sm"
        :class="{
          'dark:text-gray-300': !isSelected(item),
        }"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>
