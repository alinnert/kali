<script setup lang="ts" generic="VALUE extends string, DATA">
import type { FormListItem } from './formListItem.ts'

type Item = FormListItem<VALUE, DATA> & { cols?: number }
type Props = { items: Item[] }

defineProps<Props>()
const selectedItem = defineModel<VALUE>('selectedItem', { required: true })

const isSelected = ({ value }: Item): boolean => value === selectedItem.value
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <div
      v-for="(item, index) in items"
      :key="index"
      :class="[
        'p-3',
        'border rounded-lg',
        'select-none',
        {
          'bg-sky-100 dark:bg-sky-700': isSelected(item),
          'border-sky-300 dark:border-sky-500': isSelected(item),
          'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700': !isSelected(item),
          'border-gray-200 dark:border-gray-600': !isSelected(item),
        },
      ]"
      :style="{ gridColumn: `span ${item.cols ?? 1}` }"
      @click="$emit('update:selectedItem', item.value)"
    >
      <slot :value="item.value" :data="item.data"></slot>
    </div>
  </div>
</template>
