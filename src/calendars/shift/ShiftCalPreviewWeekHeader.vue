<script setup lang="ts">
import { t } from 'i18next'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { ShiftName, useShiftCalStore } from './shiftCalStore.js'

type Props = {
  shift: ShiftName
  columnStart: number
  rowEnd: number
}

const { shift } = defineProps<Props>()

const store = useShiftCalStore()
const { getShiftColorSet } = storeToRefs(store)

const colors = computed(() => getShiftColorSet.value(shift))
const shiftName = computed(() => t(`shiftNames.${shift}`))
</script>

<template>
  <div
    class="col-span-7 text-center uppercase print:text-xs row-start-1 border-l border-l-gray-500"
    :style="{ gridColumnStart: columnStart, backgroundColor: colors.color1 }"
  >
    {{ shiftName }}
  </div>

  <div
    :style="{
      gridColumnStart: columnStart,
      gridColumnEnd: columnStart + 7,
      gridRowStart: 2,
      backgroundColor: colors.color3,
    }"
  />

  <div
    :style="{
      gridColumnStart: columnStart + 5,
      gridColumnEnd: columnStart + 7,
      gridRowStart: 2,
      backgroundColor: colors.color2,
    }"
  />

  <div
    :style="{
      gridColumnStart: columnStart + 5,
      gridColumnEnd: columnStart + 7,
      gridRowStart: 3,
      gridRowEnd: rowEnd,
      backgroundColor: colors.color3,
    }"
  />

  <div
    class="border-l border-l-gray-500 relative"
    :style="{ gridColumnStart: columnStart, gridRowStart: 2, gridRowEnd: rowEnd }"
  />

  <div
    v-for="index in 7"
    :key="index"
    class="text-xs print:text-3xs font-bold text-center leading-none py-1 row-start-2"
    :style="{ gridColumnStart: columnStart + index - 1 }"
  >
    {{ t(`weekDays.twoLettersArr.${index - 1}`) }}
  </div>
</template>
