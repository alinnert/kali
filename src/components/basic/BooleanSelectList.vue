<script setup lang="ts">
import { computed } from 'vue'
import SelectList, { type SelectListItem } from './SelectList.vue'

type StringValue = 'yes' | 'no'

type Props = { enabledLabel: string; disabledLabel: string }

const { enabledLabel, disabledLabel } = defineProps<Props>()
const selectedModel = defineModel<boolean>('selected', { required: true })

const toString = (value: boolean): StringValue => (value ? 'yes' : 'no')
const parse = (value: StringValue): boolean => value === 'yes'

const items = computed((): SelectListItem<'yes' | 'no'>[] => {
  return [
    { value: 'yes', label: enabledLabel },
    { value: 'no', label: disabledLabel },
  ]
})

function handleSelectedItemUpdate(value: 'yes' | 'no') {
  const parsedValue = parse(value)
  if (selectedModel.value === parsedValue) return
  selectedModel.value = parsedValue
}
</script>

<template>
  <SelectList
    :items="items"
    :selected-item="toString(selected)"
    @update:selected-item="handleSelectedItemUpdate"
  />
</template>
