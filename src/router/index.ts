import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { defaultLocale, isLocaleSupported, setLocale, type SupportedLocale } from '@/i18n'
import appLoadingBar from '@/helpers/AppLoadingBar'
import DefaultLayoutView from '@/views/layouts/DefaultLayoutView.vue'

/**
 * 删除当前路由的查询参数
 * @param to 当前路由
 * @returns
 */
export function removeQueryParams(to: RouteLocationNormalized) {
  if (Object.keys(to.query).length) return { path: to.path, query: {}, hash: to.hash }
}

/**
 * 删除当前路由的 hash
 * @param to 当前路由
 * @returns
 */
export function removeHash(to: RouteLocationNormalized) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {
      path: '/:locale?',
      name: 'layout-controller',
      component: DefaultLayoutView,
      beforeEnter: async (to) => {
        // 如果没有传入语言参数，则使用浏览器语言或默认语言
        const locale = to.params.locale || navigator.language || defaultLocale
        if (typeof locale === 'string' && !isLocaleSupported(locale as SupportedLocale)) {
          return { ...to, params: { locale: defaultLocale } } // 重定向到默认语言
        }

        await setLocale(locale as SupportedLocale) // 设置语言
      },
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
        },
      ],
    },
    {
      path: '/:locale?/:pathMatch(.*)*',
      redirect: (to) => {
        return {
          path: to.params.locale ? `/${to.params.locale}` : '/',
        }
      },
    },
  ],
})

router.beforeEach((to, from) => {
  // 导航时显示加载条
  if (!from || to.path !== from.path) {
    appLoadingBar.start()
  }
})

router.afterEach((to, from) => {
  // 导航完成后隐藏加载条
  if (!from || to.path !== from.path) {
    appLoadingBar.finish()
  }
})

router.onError(() => {
  // 导航错误时加载条
  appLoadingBar.error()
})

export default router
