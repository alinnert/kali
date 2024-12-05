<script setup lang="ts">
import AppHeadline from '@/components/basic/AppHeadline.vue'
import SelectGrid from '@/components/basic/SelectGrid.vue'
import { useHolidaysStore } from '@/holidays/holidaysStore.js'
import { holidayStates } from '@/holidays/holidayStates.js'
import { useHolidays } from '@/holidays/useHolidays.js'

const holidaysStore = useHolidaysStore()

const { holidaysResult, holidays } = useHolidays()
</script>

<template>
  <AppHeadline>Feiertage</AppHeadline>

  <AppHeadline :level="2">Bundesland</AppHeadline>
  <SelectGrid
    :items="holidayStates"
    :selected-item="holidaysStore.selectedState"
    @update:selected-item="holidaysStore.setSelectedState"
  />

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
    <div v-else>huh?</div>
  </div>
</template>
