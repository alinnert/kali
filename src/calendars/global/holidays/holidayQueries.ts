type HolidayState =
  | 'BW'
  | 'BY'
  | 'BE'
  | 'BB'
  | 'HB'
  | 'HH'
  | 'HE'
  | 'MV'
  | 'NI'
  | 'NW'
  | 'RP'
  | 'SL'
  | 'SN'
  | 'ST'
  | 'SH'
  | 'TH'

export type HolidayData = { datum: string; hinweis: string }
export type HolidaysForState = Record<string, HolidayData>
export type Holidays = Record<HolidayState, HolidaysForState>

export function getHolidays(year: number, state: HolidayState): () => Promise<HolidaysForState> {
  return async () => {
    const response = await fetch(`https://feiertage-api.de/api/?jahr=${year}&nur_land=${state}`)
    if (!response.ok) {
      throw new Error('network error')
    }
    return await response.json()
  }
}
