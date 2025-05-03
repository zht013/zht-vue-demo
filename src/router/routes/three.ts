import type { RouteRecordRaw } from 'vue-router'
import { RouteIndex, RouteName } from '../constants'
import i18n from '@/i18n'

export default {
  path: 'three',
  name: RouteName.THREE.HOME,
  meta: {
    index: RouteIndex.three,
    name: () => i18n.global.t('nav.three'),
    isMenu: true,
  },
  component: () => import('@/views/three/HomeView.vue'),
} as RouteRecordRaw
