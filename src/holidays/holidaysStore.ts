import { getStorageKeyGroup } from '@/lib/general/getStorageKeyGroup'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { HolidayState } from './holidayStates'

const storageKey = getStorageKeyGroup('holidays')

export const useHolidaysStore = defineStore('holidays', {
  state: () => ({
    hiddenHolidays: useStorage<Set<string>>(storageKey('hidden-holidays'), new Set()),
    selectedState: useStorage<HolidayState | ''>(storageKey('selected-state'), ''),
  }),

  actions: {
    toggleHoliday(name: string) {
      if (this.hiddenHolidays.has(name)) {
        this.hiddenHolidays.delete(name)
      } else {
        this.hiddenHolidays.add(name)
      }
    },
    setSelectedState(state: HolidayState | '') {
      this.selectedState = state
    },
  },
})
