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
      path: 'intro',
      alias: '',
      name: RouteName.VUE3.INTRODUCE,
      meta: {
        label: () => i18n.global.t('nav.vue3.introduction'),
        isMenu: true,
      },
      component: () => import('@/views/vue3/HomeView.vue'),
    },
    {
      path: 'visual',
      meta: {
        label: () => i18n.global.t('nav.vue3.visual.label'),
        isMenu: true,
      },
      children: [
        {
          path: 'mouse-parallax',
          name: RouteName.VUE3.VISUAL.PARALLAX,
          meta: {
            label: () => i18n.global.t('nav.vue3.visual.mouseParallax'),
            isMenu: true,
          },
          component: () => import('@/views/vue3/visual/MouseParallaxView.vue'),
        },
        {
          path: 'scroll-parallax',
          name: RouteName.VUE3.VISUAL.SCROLL_PARALLAX,
          meta: {
            label: () => i18n.global.t('nav.vue3.visual.scrollParallax'),
            isMenu: true,
            isFullScreen: true,
          },
          component: () => import('@/views/vue3/visual/ScrollParallaxView.vue'),
        },
      ],
    },
    {
      path: 'web-api',
      meta: {
        label: () => i18n.global.t('nav.vue3.webDevelopment.label'),
        isMenu: true,
      },
      children: [
        {
          path: 'socket',
          name: RouteName.VUE3.WEB_DEVELOPMENT.SOCKET,
          meta: {
            label: () => i18n.global.t('nav.vue3.webDevelopment.socket'),
            isMenu: true,
          },
          component: () => import('@/views/vue3/web-development/WebSocketView.vue'),
        },
        {
          path: 'web-push',
          name: RouteName.VUE3.WEB_DEVELOPMENT.WEB_PUSH,
          meta: {
            label: () => i18n.global.t('nav.vue3.webDevelopment.webPush'),
            isMenu: true,
          },
          component: () => import('@/views/vue3/web-development/WebPushView.vue'),
        },
      ],
    },
  ],
} as RouteRecordRaw
