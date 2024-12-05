<script setup lang="ts">
import AppNavItem from '@/components/app-nav/AppNavItem.vue'
import { CalendarRange, House, Smile, Trash2 } from 'lucide-vue-next'
</script>

<template>
  <div class="grid grid-cols-[80px,300px,1fr] gap-x-2 fixed inset-0">
    <div class="border-r dark:border-r-gray-600 print:hidden bg-white dark:bg-gray-800">
      <div class="text-center py-3 font-bold italic uppercase select-none dark:text-white">Kali</div>
      <nav class="flex flex-col gap-y-1.5 p-1.5">
        <AppNavItem to="/" exact-match label="Startseite" :icon="House" />
        <AppNavItem to="/feiertage" label="Feiertage" :icon="Smile" />
        <AppNavItem to="/kalender/schicht" label="Schicht- kalender" :icon="CalendarRange" />
        <AppNavItem to="/kalender/müllabfuhr" label="Abfuhr- kalender" :icon="Trash2" />
      </nav>
    </div>

    <RouterView />
  </div>
</template>
