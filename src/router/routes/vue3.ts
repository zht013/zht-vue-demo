import i18n from '@/i18n'
import { RouteIndex, RouteName } from '../constants'
import type { RouteRecordRaw } from 'vue-router'

export default {
  path: 'vue3',
  alias: '',
  name: RouteName.VUE3.ROOT,
  meta: {
    index: RouteIndex.appHome,
    label: () => i18n.global.t('nav.vue3.label'),
    isMenu: true,
  },
  redirect: { name: RouteName.VUE3.INTRODUCE },
  children: [
    {
      path: 'introduction',
      alias: '',
      name: RouteName.VUE3.INTRODUCE,
      meta: {
        label: () => i18n.global.t('nav.vue3.introduction'),
        isMenu: true,
      },
      component: () => import('@/views/vue3/HomeView.vue'),
    },
    {
      path: 'animation',
      meta: {
        label: () => i18n.global.t('nav.vue3.animation.label'),
        isMenu: true,
      },
      children: [
        {
          path: 'parallax',
          name: RouteName.VUE3.ANIMATION.PARALLAX,
          meta: {
            label: () => i18n.global.t('nav.vue3.animation.parallax'),
            isMenu: true,
          },
          component: () => import('@/views/vue3/ParallaxView.vue'),
        },
      ],
    },
  ],
} as RouteRecordRaw
