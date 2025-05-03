import type { RouteRecordRaw } from 'vue-router'
import { RouteIndex, RouteName } from '../constants'
import i18n from '@/i18n'

export default {
  path: 'echarts',
  name: RouteName.ECHARTS.HOME,
  meta: {
    index: RouteIndex.echarts,
    name: () => i18n.global.t('nav.echarts'),
    isMenu: true,
  },
  component: () => import('@/views/echarts/HomeView.vue'),
  children: [
    {
      path: 'test',
      name: 'test',
      meta: {
        isMenu: true,
        name: () => 'test',
      },
      component: () => import('@/views/echarts/HomeView.vue'),
      children: [
        {
          path: 'test-child',
          name: 'test-child',
          meta: {
            isMenu: true,
            name: () => 'test-child',
          },
          component: () => import('@/views/echarts/HomeView.vue'),
        },
      ],
    },
  ],
} as RouteRecordRaw
