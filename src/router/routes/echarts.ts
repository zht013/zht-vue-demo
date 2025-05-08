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
  redirect: { name: RouteName.ECHARTS.INTRODUCE },
  children: [
    {
      path: 'introduction',
      alias: '',
      name: RouteName.ECHARTS.INTRODUCE,
      meta: {
        isMenu: true,
        label: () => i18n.global.t('nav.echarts.introduction'),
      },
      component: () => import('@/views/echarts/HomeView.vue'),
    },
  ],
} as RouteRecordRaw
