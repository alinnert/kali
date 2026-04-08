<script setup lang="ts">
import AppButton from '@/components/basic/AppButton.vue'
import ColorPicker from '@/components/basic/ColorPicker.vue'
import NumberInput from '@/components/basic/NumberInput.vue'
import SelectList, { type SelectListItem } from '@/components/basic/SelectList.vue'
import CalSettingItem from '@/components/calendar-settings/CalSettingItem.vue'
import CalSettings from '@/components/calendar-settings/CalSettings.vue'
import { Temporal } from '@js-temporal/polyfill'
import { t } from 'i18next'
import { useGlobalCalStore } from '../global/globalCalStore.js'
import { ShiftName, useShiftCalStore } from './shiftCalStore.js'

const store = useShiftCalStore()
const globalCalStore = useGlobalCalStore()

function shiftListItem(value: ShiftName): SelectListItem<ShiftName> {
  return { value, label: t(`shiftNames.${value}`) }
}

const shiftItems = [shiftListItem(ShiftName.Early), shiftListItem(ShiftName.Late)]
</script>

<template>
  <CalSettings headline="Schichtkalender">
    <CalSettingItem title="Jahr">
      <div class="self-start">
        <NumberInput :value="globalCalStore.year" @update:value="globalCalStore.setYear" />
      </div>

      <div class="flex gap-1">
        <AppButton @click="globalCalStore.setYear(Temporal.Now.plainDateISO().year)" inline>
          Dieses Jahr
        </AppButton>
        <AppButton @click="globalCalStore.setYear(Temporal.Now.plainDateISO().year + 1)" inline>
          Nächstes Jahr
        </AppButton>
      </div>
    </CalSettingItem>

    <CalSettingItem title="Kalender pro Seite drucken">
      <SelectList
        :items="[
          { value: 1, label: '1' },
          { value: 2, label: '2' },
          { value: 3, label: '3' },
        ]"
        :selected-item="store.printCount"
        @update:selected-item="store.setPrintCount"
      />
    </CalSettingItem>

    <CalSettingItem title="Erste Schicht">
      <SelectList
        :items="shiftItems"
        :selected-item="store.firstShiftInYear"
        @update:selected-item="store.setFirstShiftInYear"
      />
    </CalSettingItem>

    <CalSettingItem title="Wochenende">
      <SelectList
        :items="[
          { value: 'sat,sun', label: 'Samstag + Sonntag' },
          { value: 'sun', label: 'Nur Sonntag' },
        ]"
        :selected-item="store.highlightWeekdaysAsString"
        @update:selected-item="store.setHighlightWeekdaysByString"
      />
    </CalSettingItem>

    <CalSettingItem title="Farbe Frühschicht">
      <ColorPicker
        :color="store.earlyShiftColor"
        @update:color="(h) => store.setEarlyShiftColor(h)"
      ></ColorPicker>
    </CalSettingItem>

    <CalSettingItem title="Farbe Spätschicht">
      <ColorPicker
        :color="store.lateShiftColor"
        @update:color="(h) => store.setLateShiftColor(h)"
      ></ColorPicker>
    </CalSettingItem>
  </CalSettings>
</template>
