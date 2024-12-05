import { Temporal } from '@js-temporal/polyfill'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useGlobalCalStore } from '../calendars/global/globalCalStore'
import { getHolidays } from './holidaysQueries'
import { useHolidaysStore } from './holidaysStore'

type FormattedHoliday = {
  name: string
  date: Temporal.PlainDate
  info: string
}

export function useHolidays() {
  const globalCalStore = useGlobalCalStore()
  const { year } = storeToRefs(globalCalStore)
  const holidaysStore = useHolidaysStore()
  const { selectedState } = storeToRefs(holidaysStore)

  const holidaysResult = useQuery({
    queryKey: ['holidays', year, selectedState],
    queryFn: getHolidays,
    enabled: selectedState.value !== null,
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
      }),
    )
  })

  const holidayDates = computed((): Temporal.PlainDate[] => {
    return holidays.value.map((d): Temporal.PlainDate => d.date)
  })

  function isHoliday(date: Temporal.PlainDate): boolean {
    return holidayDates.value.some((d) => d.equals(date))
  }

  return { holidaysResult, holidays, holidayDates, isHoliday }
}
