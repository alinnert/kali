<script setup lang="ts">
import { getOklch } from './colorPicker.js'

defineModel<number>('hue', { required: true })

function* generateHues(step: number) {
  let hue = 0

  do {
    yield hue
    hue += step
  } while (hue < 360)
}

const hues = Array.from(generateHues(15))
</script>

<template>
  <div class="grid grid-cols-6 gap-1.5">
    <div
      v-for="h in hues"
      :key="h"
      class="grid grid-rows-2 grid-cols-2 overflow-hidden ring-offset-1 ring-sky-500 aspect-square rounded"
      :class="{ 'ring-2': h === hue }"
      @click="$emit('update:hue', h)"
    >
      <div class="col-span-2" :style="{ backgroundColor: getOklch(1, h) }"></div>
      <div :style="{ backgroundColor: getOklch(3, h) }"></div>
      <div :style="{ backgroundColor: getOklch(2, h) }"></div>
    </div>
  </div>
</template>
