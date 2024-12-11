import { getStorageKeyGroup } from '@/lib/general/getStorageKeyGroup'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import type { HolidayState } from './holidayStates'
import type { FormattedHoliday } from './useHolidays'

export type HolidayDefinition = { state: HolidayState; holiday: string }

const storageKey = getStorageKeyGroup('holidays')

export const useHolidaysStore = defineStore('holidays', {
  state: () => ({
    selectedState: useStorage<HolidayState | ''>(storageKey('selected-state'), ''),
    showSchoolOnlyHolidays: useStorage<boolean>(storageKey('show-school-only-holidays'), false),
    enabledOptionalHolidays: useStorage<HolidayDefinition[]>(
      storageKey('enabled-optional-holidays'),
      [],
    ),
  }),

  getters: {
    showHoliday() {
      return (holiday: FormattedHoliday): boolean => {
        if (holiday.onlyForSchool) {
          return this.showSchoolOnlyHolidays
        }

        if (!holiday.askDirectly) {
          return true
        }

        // Return `true` if holiday is present in "enabledOptionalHolidays" list
        return this.enabledOptionalHolidays.some((h) => {
          return h.state === this.selectedState && h.holiday === holiday.name
        })
      }
    },
  },

  actions: {
    setSelectedState(state: HolidayState | '') {
      this.selectedState = state
    },
    toggleOptionalHolidays(state: HolidayState, holiday: string) {
      const index = this.enabledOptionalHolidays.findIndex((it) => {
        return it.state === state && it.holiday === holiday
      })

      if (index === -1) {
        this.enabledOptionalHolidays.push({ state, holiday })
      } else {
        this.enabledOptionalHolidays.splice(index, 1)
      }
    },
    toggleSchoolOnlyHolidays(value?: boolean) {
      this.showSchoolOnlyHolidays = value ?? !this.showSchoolOnlyHolidays
    },
  },
})
