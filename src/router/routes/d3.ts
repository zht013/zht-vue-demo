import type { RouteRecordRaw } from 'vue-router'
import { RouteIndex, RouteName } from '../constants'
import i18n from '@/i18n'

export default {
  path: 'd3',
  name: RouteName.D3.ROOT,
  meta: {
    index: RouteIndex.d3,
    label: () => i18n.global.t('nav.d3.label'),
    isMenu: true,
  },
  redirect: { name: RouteName.D3.DASHBOARD },
  children: [
    {
      path: 'dashboard',
      alias: '',
      name: RouteName.D3.DASHBOARD,
      meta: {
        label: () => i18n.global.t('nav.d3.dashboard'),
        isMenu: true,
      },
      component: () => import('@/views/d3/DashboardView.vue'),
    },
  ],
} as RouteRecordRaw
