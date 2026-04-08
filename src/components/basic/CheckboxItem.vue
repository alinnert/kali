<script setup lang="ts">
import { Square, SquareCheckBig } from 'lucide-vue-next'

defineModel<boolean>('checked', { required: true })
</script>

<template>
  <div
    :class="['grid grid-cols-[auto,1fr] items-center gap-2 p-1']"
    @click="$emit('update:checked', !checked)"
  >
    <div>
      <component :is="checked ? SquareCheckBig : Square" :style="{ width: 20, height: 20, strokeWidth: 2 }" />
    </div>
    <div class="select-none"><slot></slot></div>
  </div>
</template>
