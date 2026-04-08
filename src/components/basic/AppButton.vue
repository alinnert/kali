<script lang="ts" setup>
import { computed, type Component } from 'vue'

type Props = { icon?: Component; inline?: boolean }

const { inline = false } = defineProps<Props>()
defineEmits(['click'])

const bgClasses = computed(() =>
  inline
    ? 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
    : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700',
)

const borderClasses = computed(() => (inline ? '' : 'border dark:border-gray-600'))
</script>

<template>
  <button
    @click="$emit('click')"
    :class="[
      'grid grid-cols-[1fr,auto] items-center',
      bgClasses,
      borderClasses,
      'px-2 py-1 rounded',
      'select-none cursor-default',
      {
        'grid-cols-[1fr,auto] gap-x-1.5': icon !== undefined,
      },
    ]"
  >
    <div v-if="icon !== undefined">
      <component :is="icon" />
    </div>

    <div class="text-sm">
      <slot />
    </div>
  </button>
</template>
