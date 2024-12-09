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
    highlightSaturdays: useStorage<boolean>(storageKey('highlight-saturdays'), true),
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
    toggleHighlightSaturdays() {
      this.highlightSaturdays = !this.highlightSaturdays
    },
  },
})
