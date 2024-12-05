import { getStorageKeyGroup } from '@/lib/general/getStorageKeyGroup'
import { Temporal } from '@js-temporal/polyfill'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const storageKey = getStorageKeyGroup('all-cals')

export const useGlobalCalStore = defineStore('all-calendars', {
  state() {
    return { year: useStorage(storageKey('year'), Temporal.Now.plainDateISO().year + 1) }
  },

  actions: {
    setYear(year: number) {
      this.year = year
    },
  },
})
