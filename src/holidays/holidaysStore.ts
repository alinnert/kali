import { getStorageKeyGroup } from '@/lib/general/getStorageKeyGroup'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const storageKey = getStorageKeyGroup('holidays')

export const useHolidaysStore = defineStore('holidays', {
  state: () => ({
    hiddenHolidays: useStorage<Set<string>>(storageKey('hidden-holidays'), new Set()),
    selectedState: useStorage<string | null>(storageKey('selected-state'), null),
  }),

  actions: {
    toggleHoliday(name: string) {
      if (this.hiddenHolidays.has(name)) {
        this.hiddenHolidays.delete(name)
      } else {
        this.hiddenHolidays.add(name)
      }
    },
    setSelectedState(state: string | null) {
      this.selectedState = state
    },
  },
})
