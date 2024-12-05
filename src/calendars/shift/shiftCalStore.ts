import { getOklchColorSet, type OklchColorSet } from '@/components/basic/colorPicker'
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
    earlyShiftHue: useStorage(storageKey('early-shift-color'), 135),
    lateShiftHue: useStorage(storageKey('late-shift-color'), 300),
    firstShiftInYear: useStorage<ShiftName>(storageKey('first-shift-in-year'), ShiftName.Early),
  }),

  getters: {
    getShiftColorSet(state): (shift: ShiftName) => OklchColorSet {
      return (shift) => {
        switch (shift) {
          case ShiftName.Early:
            return getOklchColorSet(state.earlyShiftHue)
          case ShiftName.Late:
            return getOklchColorSet(state.lateShiftHue)
          default:
            return getOklchColorSet(0)
        }
      }
    },
  },

  actions: {
    setEarlyShiftHue(hue: number) {
      this.earlyShiftHue = hue
    },
    setLateShiftHue(hue: number) {
      this.lateShiftHue = hue
    },
    setFirstShiftInYear(firstShift: ShiftName) {
      this.firstShiftInYear = firstShift
    },
  },
})
