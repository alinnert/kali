<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

type Props = { src: string; alt: string }

const { src } = defineProps<Props>()

const { data, isPending } = useQuery({
  queryKey: ['dynamic-image', src],
  async queryFn(): Promise<string> {
    return import(src)
  },
})
</script>

<template>
  <div v-if="isPending"></div>
  <img v-else :src="data" :alt="alt" />
</template>
