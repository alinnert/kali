<script setup lang="ts">
import AppHeadline from '@/components/basic/AppHeadline.vue'
import SelectGrid from '@/components/basic/SelectGrid.vue'
import { useHolidaysStore } from '@/holidays/holidaysStore.js'
import { holidayStates } from '@/holidays/holidayStates.js'
import { useHolidays } from '@/holidays/useHolidays.js'
import { X } from 'lucide-vue-next'

const holidaysStore = useHolidaysStore()

const { holidaysResult, holidays } = useHolidays()
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
    <AppHeadline :level="2">Feiertage (de)aktivieren</AppHeadline>

    <div @click="holidaysStore.toggleSchoolOnlyHolidays">
      {{ holidaysStore.showSchoolOnlyHolidays ? '[X]' : '[_]' }} Schulfreie Tage anzeigen
    </div>

    <template v-for="holiday in holidays" :key="holiday.name">
      <div
        v-if="holiday.askDirectly"
        @click="holidaysStore.toggleOptionalHolidays(holidaysStore.selectedState, holiday.name)"
      >
        {{
          holidaysStore.enabledOptionalHolidays.some(
            (it) => it.state === holidaysStore.selectedState && it.holiday === holiday.name,
          )
            ? '[X]'
            : '[_]'
        }}
        {{ holiday.name }} anzeigen
      </div>
    </template>

    <AppHeadline :level="2">Feiertage</AppHeadline>

    <div>
      <div v-if="holidaysResult.isPending.value">Laden...</div>
      <div v-else-if="holidaysResult.isError.value">{{ holidaysResult.error }}</div>
      <div v-else-if="holidaysResult.isFetched.value">
        <div v-for="holiday in holidays" :key="holiday.name" class="mb-4">
          <div class="grid grid-cols-2 text-sm">
            <div class="font-bold">{{ holiday.name }}</div>
            <div>{{ holiday.date.toLocaleString() }}</div>
          </div>
          <div class="text-xs" v-if="holiday.info !== ''">{{ holiday.info }}</div>
        </div>
      </div>
    </div>
  </template>
</template>
