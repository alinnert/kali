import { Temporal } from '@js-temporal/polyfill'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGlobalCalStore } from '../calendars/global/globalCalStore'
import { getHolidays } from './holidaysQueries'
import { useHolidaysStore } from './holidaysStore'
import type { HolidayState } from './holidayStates'

export type FormattedHoliday = {
  name: string
  date: Temporal.PlainDate
  info: string
  onlyForSchool: boolean
  askDirectly: boolean
}

type PartialGroupedHolidayList = Partial<Record<HolidayState, string[]>>

const onlyForSchoolHolidays: PartialGroupedHolidayList = {
  BW: ['Reformationstag'],
  BY: ['Buß- und Bettag'],
}

const askDirectlyHolidays: PartialGroupedHolidayList = {
  BY: ['Augsburger Friedensfest', 'Mariä Himmelfahrt'],
  SN: ['Fronleichnam'],
  TH: ['Fronleichnam'],
}

function isListed(
  list: Partial<Record<HolidayState, string[]>>,
  state: HolidayState | '',
  holiday: string,
): boolean {
  if (state === '') {
    return false
  }

  return list[state]?.includes(holiday) ?? false
}

export function useHolidays() {
  const globalCalStore = useGlobalCalStore()
  const { year } = storeToRefs(globalCalStore)
  const holidaysStore = useHolidaysStore()
  const { selectedState } = storeToRefs(holidaysStore)

  const holidaysResult = useQuery({
    queryKey: ['holidays', year, selectedState],
    queryFn: getHolidays,
    enabled: computed((): boolean => selectedState.value !== ''),
  })

  const holidays = computed((): FormattedHoliday[] => {
    if (holidaysResult.data.value === undefined) {
      return []
    }

    return Object.entries(holidaysResult.data.value).map(
      ([name, data]): FormattedHoliday => ({
        name,
        date: Temporal.PlainDate.from(data.datum),
        info: data.hinweis,
        onlyForSchool: isListed(onlyForSchoolHolidays, selectedState.value, name),
        askDirectly: isListed(askDirectlyHolidays, selectedState.value, name),
      }),
    )
  })

  const holidayDates = computed((): Temporal.PlainDate[] => {
    return holidays.value.map((d): Temporal.PlainDate => d.date)
  })

  function isHoliday(date: Temporal.PlainDate): boolean {
    const holiday = holidays.value.find((h) => h.date.equals(date))
    if (holiday === undefined) {
      return false
    }

    return holidaysStore.showHoliday(holiday)
  }

  return { holidaysResult, holidays, holidayDates, isHoliday }
}
