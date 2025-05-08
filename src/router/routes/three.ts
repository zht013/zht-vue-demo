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
  redirect: { name: RouteName.THREE.INTRODUCE },
  children: [
    {
      path: 'introduction',
      alias: '',
      name: RouteName.THREE.INTRODUCE,
      meta: {
        label: () => i18n.global.t('nav.three.introduction'),
        isMenu: true,
      },
      component: () => import('@/views/three/HomeView.vue'),
    },
  ],
} as RouteRecordRaw
