<script setup lang="ts">
import type { ColorPickerColor } from './colorPicker.ts'
import ColorPickerItem from './ColorPickerItem.vue'

defineModel<ColorPickerColor>('color', { required: true })

function* generateHues(amount: number) {
  const step = 360 / amount
  let hue = 0

  do {
    yield Math.round(hue)
    hue += step
  } while (hue < 360)
}

const hues = Array.from(generateHues(6 * 3 + 4))
const grays = [85, 70]
</script>

<template>
  <div class="grid grid-cols-6 gap-1.5">
    <ColorPickerItem
      v-for="hue in hues"
      :key="hue"
      :color="{ type: 'hue', hue }"
      :selected="color.type === 'hue' && color.hue === hue"
      @click="$emit('update:color', { type: 'hue', hue })"
    />

    <ColorPickerItem
      v-for="gray in grays"
      :key="gray"
      :color="{ type: 'gray', gray }"
      :selected="color.type === 'gray' && color.gray === gray"
      @click="$emit('update:color', { type: 'gray', gray })"
    />
  </div>
</template>
