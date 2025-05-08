import type { RouteRecordRaw } from 'vue-router'
import { RouteIndex, RouteName } from '../constants'
import i18n from '@/i18n'
import { LayoutType } from '@/types'

export default {
  path: 'dv-project',
  name: RouteName.DV_PROJECT.HOME,
  meta: {
    index: RouteIndex.dvProject,
    label: () => i18n.global.t('nav.dvProject.label'),
    isMenu: true,
    layout: LayoutType.dvProject,
  },
  component: () => import('@/views/dv-project/HomeView.vue'),
} as RouteRecordRaw
