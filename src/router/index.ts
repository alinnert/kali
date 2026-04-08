import AppLayout from '@/layouts/AppLayout.vue'
import CalendarLayout from '@/layouts/CalendarLayout.vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BasicContentLayout from '@/layouts/BasicContentLayout.vue'
import HolidayView from '@/views/HolidayView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '',
          component: BasicContentLayout,
          children: [
            { path: '', name: 'home', component: HomeView },
            { path: 'feiertage', name: 'holidays', component: HolidayView },
          ],
        },
        {
          path: 'kalender',
          component: CalendarLayout,
          children: [
            {
              path: 'schicht',
              name: 'shift-cal',
              components: {
                settings: () => import('../calendars/shift/ShiftCalSettings.vue'),
                preview: () => import('../calendars/shift/ShiftCalPreview.vue'),
              },
            },
            {
              path: 'müllabfuhr',
              name: 'litter-cal',
              components: {
                settings: () => import('../calendars/litter/LitterCalSettings.vue'),
                preview: () => import('../calendars/litter/LitterCalPreview.vue'),
              },
            },
          ],
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
