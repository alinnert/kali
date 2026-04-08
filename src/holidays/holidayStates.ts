import type { FormListItem } from '@/components/basic/formListItem'

export type HolidayState =
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

export const holidayStates: FormListItem<HolidayState, { name: string }>[] = [
  { value: 'BW', data: { name: 'Baden-Württemberg' } },
  { value: 'BY', data: { name: 'Bayern' } },
  { value: 'BE', data: { name: 'Berlin' } },
  { value: 'BB', data: { name: 'Brandenburg' } },
  { value: 'HB', data: { name: 'Bremen' } },
  { value: 'HH', data: { name: 'Hamburg' } },
  { value: 'HE', data: { name: 'Hessen' } },
  { value: 'MV', data: { name: 'Mecklenburg-Vorpommern' } },
  { value: 'NI', data: { name: 'Niedersachsen' } },
  { value: 'NW', data: { name: 'Nordrhein-Westfalen' } },
  { value: 'RP', data: { name: 'Rheinland Pfalz' } },
  { value: 'SL', data: { name: 'Saarland' } },
  { value: 'SN', data: { name: 'Sachsen' } },
  { value: 'ST', data: { name: 'Sachsen-Anhalt' } },
  { value: 'SH', data: { name: 'Schleswig Holstein' } },
  { value: 'TH', data: { name: 'Thüringen' } },
]
