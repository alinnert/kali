<script setup lang="ts">
import type { Component } from 'vue'
import { RouterLink } from 'vue-router'

type Props = {
  label: string
  icon: Component
  exactMatch?: boolean
  to: string
}

const { exactMatch = false } = defineProps<Props>()

function doesMatch(isExactActive: boolean, isActive: boolean): boolean {
  return exactMatch ? isExactActive : isActive
}
</script>

<template>
  <RouterLink :to="to" v-slot="{ isActive, isExactActive }" class="cursor-default select-none">
    <div
      :class="[
        'content-center text-center h-full aspect-square rounded-lg',
        {
          'bg-sky-200 text-sky-800 dark:bg-sky-700 dark:text-sky-200': doesMatch(
            isExactActive,
            isActive,
          ),
          'hover:bg-sky-50 dark:hover:bg-gray-600 active:bg-sky-100 dark:active:bg-gray-500':
            !doesMatch(isExactActive, isActive),
          'text-gray-500 dark:text-gray-300 hover:text-sky-700 dark:hover:text-gray-300 active:text-sky-900':
            !doesMatch(isExactActive, isActive),
        },
      ]"
    >
      <div class="grid justify-center">
        <component :is="icon" :style="{ width: 24, height: 24, strokeWidth: 1.5 }" />
      </div>
      <div class="text-2xs mt-1 leading-3 tracking-tighter">
        {{ label }}
      </div>
    </div>
  </RouterLink>
</template>
