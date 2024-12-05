<template>
  <div class="dark:text-gray-50 overflow-hidden print:hidden">
    <RouterView name="settings" />
  </div>

  <div class="py-2 pr-2 print:p-0 grid">
    <div
      :class="[
        'grid items-start justify-center',
        'bg-white dark:bg-gray-800 print:bg-transparent',
        'rounded-xl print:rounded-none',
        'border print:border-none border-gray-200 dark:border-gray-600',
        'p-4 print:p-0',
      ]"
    >
      <RouterView name="preview" />
    </div>
  </div>
</template>
