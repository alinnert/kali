<script setup lang="ts">
import AppHeadline from '@/components/basic/AppHeadline.vue'
import CheckboxItem from '@/components/basic/CheckboxItem.vue'
import SelectGrid from '@/components/basic/SelectGrid.vue'
import { useHolidaysStore } from '@/holidays/holidaysStore.js'
import { holidayStates } from '@/holidays/holidayStates.js'
import { useHolidays } from '@/holidays/useHolidays.js'
import { X } from 'lucide-vue-next'

const holidaysStore = useHolidaysStore()
const { holidaysResult, holidays, holidaysToAskDirectly, hasSchoolOnlyHolidays } = useHolidays()
</script>

<template>
  <AppHeadline>Feiertage</AppHeadline>

  <AppHeadline :level="2">Bundesland</AppHeadline>

  <SelectGrid
    :items="[{ value: '', cols: 4, data: { name: 'Keine Feiertage' } }, ...holidayStates]"
    :selected-item="holidaysStore.selectedState"
    @update:selected-item="holidaysStore.setSelectedState"
    v-slot="{ data, value }"
  >
    <div class="flex items-center gap-2" :class="{ 'flex-col': value !== '' }">
      <img
        v-if="value !== ''"
        :src="`/emblems/${value.toLowerCase()}.svg`"
        alt=""
        class="w-16 h-16"
      />
      <div v-else class="w-10 h-10 grid items-center justify-center">
        <X :style="{ width: 24, height: 24 }" />
      </div>
      <div class="text-center text-sm leading-4">{{ data.name }}</div>
    </div>
  </SelectGrid>

  <template v-if="holidaysStore.selectedState !== ''">
    <template v-if="hasSchoolOnlyHolidays || holidaysToAskDirectly.length > 0">
      <AppHeadline :level="2">Einstellungen</AppHeadline>

      <CheckboxItem
        v-if="hasSchoolOnlyHolidays"
        :checked="holidaysStore.showSchoolOnlyHolidays"
        @update:checked="holidaysStore.toggleSchoolOnlyHolidays"
      >
        Schulfreie Tage (blau) darstellen
      </CheckboxItem>

      <template v-for="holiday in holidaysToAskDirectly" :key="holiday.name">
        <CheckboxItem
          :checked="
            holidaysStore.enabledOptionalHolidays.some(
              (it) => it.state === holidaysStore.selectedState && it.holiday === holiday.name,
            )
          "
          @update:checked="
            holidaysStore.toggleOptionalHolidays(holidaysStore.selectedState, holiday.name)
          "
        >
          {{ holiday.name }} anzeigen
        </CheckboxItem>
        <p v-if="holiday.info !== ''" class="text-xs mb-4">{{ holiday.info }}</p>
      </template>
    </template>

    <div>
      <div v-if="holidaysResult.isPending.value">Feiertage werden geladen...</div>
      <div v-else-if="holidaysResult.isError.value">{{ holidaysResult.error }}</div>
      <div v-else-if="holidaysResult.isFetched.value">
        <AppHeadline :level="2">Feiertage</AppHeadline>

        <div v-for="holiday in holidays" :key="holiday.name" class="mb-2">
          <div class="grid grid-cols-[auto,1fr] gap-4 items-baseline">
            <div
              class="font-mono text-sm"
              :class="{ 'text-gray-400 dark:text-gray-500': !holidaysStore.showHoliday(holiday) }"
            >
              {{
                holiday.date.toLocaleString('de-de', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              }}
            </div>
            <div class="flex items-center">
              <div
                class="font-bold"
                :class="{
                  'line-through text-gray-400 dark:text-gray-500 decoration-gray-600 dark:decoration-gray-400':
                    !holidaysStore.showHoliday(holiday),
                }"
              >
                {{ holiday.name }}
              </div>

              <div
                v-if="holiday.onlyForSchool"
                :class="[
                  'ml-2 px-1.5 py-1 text-3xs font-bold uppercase leading-none',
                  'bg-sky-700 text-white',
                  'rounded',
                ]"
              >
                Schulfrei
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>
