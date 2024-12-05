<script setup lang="ts">
import { useGlobalCalStore } from '@/calendars/global/globalCalStore.js'
import { getHolidays } from '@/calendars/global/holidays/holidayQueries.js'
import AppHeadline from '@/components/basic/AppHeadline.vue'
import { useQuery } from '@tanstack/vue-query'

const globalCalStore = useGlobalCalStore()

const { isPending, isError, error, data } = useQuery({
  queryKey: ['holidays'],
  queryFn: getHolidays(globalCalStore.year, 'BY'),
})
</script>

<template>
  <AppHeadline>Feiertage</AppHeadline>

  <AppHeadline :level="2">Bundesland</AppHeadline>

  <AppHeadline :level="2">Feiertage</AppHeadline>
  <div>
    <div v-if="isPending">Laden...</div>
    <div v-else-if="isError">{{ error }}</div>
    <div v-else>
      <div v-for="(info, holiday) in data" :key="holiday" class="mb-4">
        <div class="grid grid-cols-2 text-sm">
          <div class="font-bold">{{ holiday }}</div>
          <div>{{ info.datum }}</div>
        </div>
        <div class="text-xs" v-if="info.hinweis !== ''">{{ info.hinweis }}</div>
      </div>
    </div>
  </div>
</template>
