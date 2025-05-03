import i18n from '@/i18n'
import { RouteIndex, RouteName } from '../constants'
import type { RouteRecordRaw } from 'vue-router'

export default {
  path: '',
  name: RouteName.APP_HOME,
  meta: {
    index: RouteIndex.appHome,
    name: () => i18n.global.t('nav.app-home'),
    isMenu: true,
  },
  component: () => import('@/views/HomeView.vue'),
} as RouteRecordRaw
