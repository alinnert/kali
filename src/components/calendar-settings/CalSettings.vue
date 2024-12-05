<script lang="ts" setup>
import { Printer } from 'lucide-vue-next'
import AppButton from '../basic/AppButton.vue'
import AppHeadline from '../basic/AppHeadline.vue'

type Props = { headline: string }

defineProps<Props>()

function handlePrintClick() {
  window.print()
}
</script>

<template>
  <div class="grid grid-rows-[auto,1fr] max-h-full">
    <div class="grid grid-cols-[1fr,auto] py-2">
      <AppHeadline>{{ headline }}</AppHeadline>

      <div>
        <AppButton :icon="Printer" @click="handlePrintClick">Drucken</AppButton>
      </div>
    </div>

    <div class="overflow-scroll grid gap-y-2 py-2">
      <slot />
    </div>
  </div>
</template>
