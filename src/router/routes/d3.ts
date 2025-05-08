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
  redirect: { name: RouteName.D3.INTRODUCE },
  children: [
    {
      path: 'introduction',
      alias: '',
      name: RouteName.D3.INTRODUCE,
      meta: {
        label: () => i18n.global.t('nav.d3.introduction'),
        isMenu: true,
      },
      component: () => import('@/views/d3/HomeView.vue'),
    },
  ],
} as RouteRecordRaw
