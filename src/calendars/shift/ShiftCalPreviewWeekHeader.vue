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
  <!-- Shift name -->
  <div
    class="col-span-7 text-center uppercase print:text-xs row-start-1 border-l border-l-gray-600"
    :style="{ gridColumnStart: columnStart, backgroundColor: colors.color1 }"
  >
    {{ shiftName }}
  </div>

  <!-- Weekday header -->
  <div
    :style="{
      gridColumnStart: columnStart,
      gridColumnEnd: columnStart + 7,
      gridRowStart: 2,
      backgroundColor: colors.color3,
    }"
  />

  <!-- Highlighted weekdays header background -->
  <template v-for="weekdayIndex in 7" :key="weekdayIndex">
    <div
      v-if="store.highlightWeekdayWithIndex(weekdayIndex - 1)"
      :style="{
        gridColumnStart: columnStart + weekdayIndex - 1,
        gridColumnEnd: columnStart + weekdayIndex,
        gridRowStart: 2,
        backgroundColor: colors.color2,
      }"
    />
  </template>

  <!-- Highlighted weekdays background -->
  <template v-for="weekdayIndex in 7" :key="weekdayIndex">
    <div
      v-if="store.highlightWeekdayWithIndex(weekdayIndex - 1)"
      :style="{
        gridColumnStart: columnStart + weekdayIndex - 1,
        gridColumnEnd: columnStart + weekdayIndex,
        gridRowStart: 3,
        gridRowEnd: rowEnd,
        backgroundColor: colors.color3,
      }"
    />
  </template>

  <!-- Vertical line -->
  <div
    class="border-l border-l-gray-600 relative"
    :style="{ gridColumnStart: columnStart, gridRowStart: 2, gridRowEnd: rowEnd }"
  />

  <div
    v-for="weekdayIndex in 7"
    :key="weekdayIndex"
    class="text-xs print:text-3xs text-center leading-none py-1 row-start-2"
    :class="{
      'font-bold': store.highlightWeekdayWithIndex(weekdayIndex - 1),
    }"
    :style="{ gridColumnStart: columnStart + weekdayIndex - 1 }"
  >
    {{ t(`weekDays.twoLettersArr.${weekdayIndex - 1}`) }}
  </div>
</template>
