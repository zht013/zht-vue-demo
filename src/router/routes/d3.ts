import type { RouteRecordRaw } from 'vue-router'
import { RouteIndex, RouteName } from '../constants'
import i18n from '@/i18n'

export default {
  path: 'd3',
  name: RouteName.D3.HOME,
  meta: {
    index: RouteIndex.d3,
    name: () => i18n.global.t('nav.d3'),
    isMenu: true,
  },
  component: () => import('@/views/d3/HomeView.vue'),
} as RouteRecordRaw
