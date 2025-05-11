import type { RouteRecordRaw } from 'vue-router'
import { RouteIndex, RouteName } from '../constants'
import i18n from '@/i18n'

export default {
  path: 'echarts',
  name: RouteName.ECHARTS.ROOT,
  meta: {
    index: RouteIndex.echarts,
    label: () => i18n.global.t('nav.echarts.label'),
    isMenu: true,
  },
  redirect: { name: RouteName.ECHARTS.DASHBOARD },
  children: [
    {
      path: 'dashboard',
      alias: '',
      name: RouteName.ECHARTS.DASHBOARD,
      meta: {
        isMenu: true,
        label: () => i18n.global.t('nav.echarts.dashboard'),
      },
      component: () => import('@/views/echarts/DashboardView.vue'),
    },
  ],
} as RouteRecordRaw
