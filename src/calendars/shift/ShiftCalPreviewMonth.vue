<script setup lang="ts">
import { t } from 'i18next'

type Props = {
  rowStart: number
  rowEnd: number
  index: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="col-start-1 text-xs print:text-3xs font-bold border-gray-500 content-center text-center px-0.5 bg-gray-100 border-r uppercase"
    :style="{ gridRowStart: rowStart, gridRowEnd: rowEnd }"
  >
    {{ t(`months.${index}`) }}
  </div>

  <div
    class="-mt-px"
    :class="{
      'border-t-2 border-gray-600': index % 3 === 0,
      'border-t border-gray-400': index % 3 !== 0,
    }"
    :style="{ gridRowStart: rowStart, gridColumnStart: 1, gridColumnEnd: -1 }"
  />
</template>
