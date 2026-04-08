import type { QueryFunctionContext } from '@tanstack/vue-query'
import type { HolidayState } from './holidayStates'

export type HolidayData = { datum: string; hinweis: string }
export type HolidaysForState = Record<string, HolidayData>
export type Holidays = Record<HolidayState, HolidaysForState>

export async function getHolidays({
  queryKey: [, year, state],
}: QueryFunctionContext): Promise<HolidaysForState> {
  const response = await fetch(`https://feiertage-api.de/api/?jahr=${year}&nur_land=${state}`)
  if (!response.ok) {
    throw new Error('network error')
  }
  return await response.json()
}
