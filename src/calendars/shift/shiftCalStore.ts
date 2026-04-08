import {
  getOklchColorSet,
  type ColorPickerColor,
  type OklchColorSet,
} from '@/components/basic/colorPicker'
import { getStorageKeyGroup } from '@/lib/general/getStorageKeyGroup'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export enum ShiftName {
  Early = 'early',
  Late = 'late',
}

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const
export type Weekday = (typeof weekdays)[number]

const storageKey = getStorageKeyGroup('shift-cal')

export const useShiftCalStore = defineStore('shift-calendar', {
  state: () => ({
    earlyShiftColor: useStorage<ColorPickerColor>(storageKey('early-shift-color'), {
      type: 'hue',
      hue: 135,
    }),
    lateShiftColor: useStorage<ColorPickerColor>(storageKey('late-shift-color'), {
      type: 'hue',
      hue: 300,
    }),
    firstShiftInYear: useStorage<ShiftName>(storageKey('first-shift-in-year'), ShiftName.Early),
    highlightWeekdays: useStorage<Set<Weekday>>(
      storageKey('highlight-weekdays'),
      new Set(['sat', 'sun']),
    ),
    printCount: useStorage<number>(storageKey('print-count'), 1),
  }),

  getters: {
    getShiftColorSet(state): (shift: ShiftName) => OklchColorSet {
      return (shift) => {
        switch (shift) {
          case ShiftName.Early:
            return getOklchColorSet(state.earlyShiftColor)
          case ShiftName.Late:
            return getOklchColorSet(state.lateShiftColor)
          default:
            return getOklchColorSet({ type: 'hue', hue: 0 })
        }
      }
    },
    highlightWeekdaysAsString(): string {
      return Array.from(this.highlightWeekdays.values()).join(',')
    },
    highlightWeekdayWithIndex() {
      return (index: number) => {
        const weekday = weekdays[index]
        return this.highlightWeekdays.has(weekday)
      }
    },
  },

  actions: {
    setEarlyShiftColor(color: ColorPickerColor) {
      this.earlyShiftColor = color
    },
    setLateShiftColor(color: ColorPickerColor) {
      this.lateShiftColor = color
    },
    setFirstShiftInYear(firstShift: ShiftName) {
      this.firstShiftInYear = firstShift
    },
    setHighlightWeekdays(weekend: Set<Weekday>) {
      this.highlightWeekdays = weekend
    },
    setHighlightWeekdaysByString(value: string) {
      const entries = value.split(',')
      const weekdayEntries = entries.filter((e): e is Weekday => weekdays.includes(e as Weekday))
      this.highlightWeekdays = new Set(weekdayEntries)
    },
    setPrintCount(count: number) {
      this.printCount = count
    },
  },
})
