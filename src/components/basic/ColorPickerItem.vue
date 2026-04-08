<script setup lang="ts">
import { getOklch, type ColorPickerColor } from './colorPicker.ts'

type Props = {
  color: ColorPickerColor
  selected: boolean
}

defineProps<Props>()
defineEmits(['click'])
</script>

<template>
  <div
    class="grid grid-rows-2 grid-cols-2 overflow-hidden ring-offset-1 ring-sky-500 aspect-square rounded"
    :class="{ 'ring-2': selected }"
    @click="$emit('click')"
  >
    <div class="col-span-2" :style="{ backgroundColor: getOklch(1, color) }"></div>
    <div :style="{ backgroundColor: getOklch(3, color) }"></div>
    <div :style="{ backgroundColor: getOklch(2, color) }"></div>
  </div>
</template>
