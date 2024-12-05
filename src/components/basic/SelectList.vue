<script setup lang="ts" generic="VALUE extends string">
import { Circle, CircleCheckBig } from 'lucide-vue-next'

export type SelectListItem<V> = { value: V; label: string }

type Props = {
  items: SelectListItem<VALUE>[]
}

defineProps<Props>()
defineModel<VALUE>('selectedItem', { required: true })
</script>

<template>
  <div>
    <div
      v-for="item in items"
      :key="item.value"
      :class="[
        'grid grid-cols-[auto,1fr] items-center gap-3',
        'p-1',
        'dark:hover:bg-gray-700',
        'rounded',
      ]"
      @click="$emit('update:selectedItem', item.value)"
    >
      <div class="grid py-1">
        <CircleCheckBig v-if="selectedItem === item.value" />
        <Circle v-else class="dark:text-gray-500" />
      </div>
      <div class="text-sm">{{ item.label }}</div>
    </div>
  </div>
</template>
