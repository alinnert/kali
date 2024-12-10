<script setup lang="ts">
import ShiftCalPreviewMonth from '@/calendars/shift/ShiftCalPreviewMonth.vue'
import ShiftCalPreviewWeekHeader from '@/calendars/shift/ShiftCalPreviewWeekHeader.vue'
import { Temporal } from '@js-temporal/polyfill'
import { computed } from 'vue'
import { useHolidays } from '../../holidays/useHolidays.js'
import { useGlobalCalStore } from '../global/globalCalStore.js'
import { ShiftName, useShiftCalStore } from './shiftCalStore.js'

const store = useShiftCalStore()
const globalCalStore = useGlobalCalStore()

const { isHoliday } = useHolidays()

const firstDay = computed(() =>
  Temporal.PlainDate.from({ year: globalCalStore.year, month: 1, day: 1 }),
)

const allMonths = computed((): Temporal.PlainYearMonth[] => {
  return Array(12)
    .fill(undefined)
    .map((_, index) =>
      Temporal.PlainYearMonth.from({ year: globalCalStore.year, month: index + 1 }),
    )
})

const allDaysOfYear = computed((): Temporal.PlainDate[] => {
  const days: Temporal.PlainDate[] = []

  let currentDay = firstDay.value

  do {
    days.push(Temporal.PlainDate.from(currentDay))
    currentDay = currentDay.add({ days: 1 })
  } while (currentDay.year === globalCalStore.year)

  return days
})

function getFirstDayInMonth(month: Temporal.PlainYearMonth): Temporal.PlainDate {
  return Temporal.PlainDate.from({ year: month.year, month: month.month, day: 1 })
}

function getLastDayInMonth(month: Temporal.PlainYearMonth): Temporal.PlainDate {
  return Temporal.PlainDate.from({ year: month.year, month: month.month, day: month.daysInMonth })
}

const daysPerRow = 7 * 4

function getDateCol(index: number): number {
  const dayOfWeekOffset = allDaysOfYear.value[0].dayOfWeek
  const startingShiftOffset = store.firstShiftInYear === ShiftName.Early ? 0 : 7
  const offsetIndex = index - 1 + dayOfWeekOffset + startingShiftOffset
  return (offsetIndex % daysPerRow) + 2
}

function getDateRow(index: number): number {
  const dayOfWeekOffset = allDaysOfYear.value[0].dayOfWeek
  const startingShiftOffset = store.firstShiftInYear === ShiftName.Early ? 0 : 7
  const offsetIndex = index + dayOfWeekOffset + startingShiftOffset
  return Math.ceil(offsetIndex / daysPerRow) + 1 + allDaysOfYear.value[index].month
}

function getShift(index: number): ShiftName {
  return index % 2 === 0 ? ShiftName.Late : ShiftName.Early
}
</script>

<template>
  <div
    v-for="i in store.printCount"
    :key="i"
    class="hidden first:grid print:grid bg-white grid-cols-[auto,repeat(28,1fr)] w-[18cm] print:w-[14cm] border border-gray-600"
  >
    <div
      :class="[
        'row-span-2 row-start-1 col-start-1',
        'px-0.5',
        'text-center content-center',
        'text-sm print:text-2xs font-bold',
        'text-white',
        'bg-gray-600',
      ]"
    >
      <div class="-rotate-45">{{ globalCalStore.year }}</div>
    </div>

    <ShiftCalPreviewWeekHeader
      v-for="n in 4"
      :key="n"
      :shift="getShift(n)"
      :column-start="7 * (n - 1) + 2"
      :row-end="getDateRow(getLastDayInMonth(allMonths.at(-1)!).dayOfYear - 1) + 1"
    />

    <div
      v-for="(day, index) in allDaysOfYear"
      :key="day.toString()"
      class="grid items-center justify-center text-xs leading-[0] h-4 print:h-[3mm] print:text-3xs text-center px-0.5 py-[0.5px]"
      :class="{
        'font-bold': isHoliday(day) !== 'none',
        'bg-red-500 text-white': isHoliday(day) === 'work',
        'bg-sky-500 text-white': isHoliday(day) === 'school',
      }"
      :style="{ gridRowStart: getDateRow(index), gridColumnStart: getDateCol(index) }"
    >
      {{ day.day }}
    </div>

    <ShiftCalPreviewMonth
      v-for="(month, index) in allMonths"
      :key="month.toString()"
      :index="index"
      :row-start="getDateRow(getFirstDayInMonth(month).dayOfYear - 1)"
      :row-end="getDateRow(getLastDayInMonth(month).dayOfYear - 1) + 1"
    />
  </div>
</template>
