<script setup lang="ts">
import { t } from 'i18next';

type Props = {
  rowStart: number
  rowEnd: number
  index: number
}

defineProps<Props>()
</script>

<template>
  <div
    class="col-start-1 text-sm print:text-2xs font-bold border-gray-500 content-center text-center px-0.5 bg-gray-100 border-r"
    :class="{ 'border-t-2': index % 3 === 0, 'border-t': index % 3 !== 0 }"
    :style="{ gridRowStart: rowStart, gridRowEnd: rowEnd }"
  >
    {{ t(`months.${index}`) }}
  </div>

  <div
    class="border-gray-500"
    :class="{ 'border-t-2': index % 3 === 0, 'border-t': index % 3 !== 0 }"
    :style="{ gridRowStart: rowStart, gridColumnStart: 2, gridColumnEnd: -1 }"
  />
</template>
