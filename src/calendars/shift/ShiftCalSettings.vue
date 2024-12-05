<script setup lang="ts">
import ColorPicker from '@/components/basic/ColorPicker.vue'
import SelectList, { type SelectListItem } from '@/components/basic/SelectList.vue'
import CalSettingItem from '@/components/calendar-settings/CalSettingItem.vue'
import CalSettings from '@/components/calendar-settings/CalSettings.vue'
import { t } from 'i18next'
import { ShiftName, useShiftCalStore } from './shiftCalStore.js'
import { useGlobalCalStore } from '../global/globalCalStore.js'
import NumberInput from '@/components/basic/NumberInput.vue'
import AppButton from '@/components/basic/AppButton.vue'
import { Temporal } from '@js-temporal/polyfill'

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

    <CalSettingItem title="Erste Schicht">
      <SelectList
        :items="shiftItems"
        :selectedItem="store.firstShiftInYear"
        @update:selectedItem="store.setFirstShiftInYear"
      />
    </CalSettingItem>

    <CalSettingItem title="Anzahl drucken"></CalSettingItem>
    <CalSettingItem title="Samstag einfärben"></CalSettingItem>
    <CalSettingItem title="Farbe Frühschicht">
      <ColorPicker
        :hue="store.earlyShiftHue"
        @update:hue="(h) => store.setEarlyShiftHue(h)"
      ></ColorPicker>
    </CalSettingItem>
    <CalSettingItem title="Farbe Spätschicht">
      <ColorPicker
        :hue="store.lateShiftHue"
        @update:hue="(h) => store.setLateShiftHue(h)"
      ></ColorPicker>
    </CalSettingItem>
  </CalSettings>
</template>
