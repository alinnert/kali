<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'
import AppButton from './AppButton.vue'

defineModel('value', { required: true })
</script>

<template>
  <div class="grid grid-cols-[auto,auto] items-center gap-x-2">
    <div class="text-sm">{{ value }}</div>
    <div class="grid grid-cols-2 gap-1 self-stretch">
      <AppButton inline @click="$emit('update:value', value - 1)">
        <Minus />
      </AppButton>
      <AppButton inline @click="$emit('update:value', value + 1)">
        <Plus />
      </AppButton>
    </div>
  </div>
</template>
