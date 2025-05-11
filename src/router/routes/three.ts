import type { RouteRecordRaw } from 'vue-router'
import { RouteIndex, RouteName } from '../constants'
import i18n from '@/i18n'

export default {
  path: 'three',
  name: RouteName.THREE.ROOT,
  meta: {
    index: RouteIndex.three,
    label: () => i18n.global.t('nav.three.label'),
    isMenu: true,
  },
  redirect: { name: RouteName.THREE.DASHBOARD },
  children: [
    {
      path: 'dashboard',
      alias: '',
      name: RouteName.THREE.DASHBOARD,
      meta: {
        label: () => i18n.global.t('nav.three.dashboard'),
        isMenu: true,
      },
      component: () => import('@/views/three/DashboardView.vue'),
    },
  ],
} as RouteRecordRaw
