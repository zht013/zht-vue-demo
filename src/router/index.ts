import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'
import { defaultLocale, isLocaleSupported, setLocale, type SupportedLocale } from '@/i18n'
import HomeView from '../views/HomeView.vue'
import LayoutControllerView from '@/views/layouts/LayoutControllerView.vue'

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
      component: LayoutControllerView,
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
          component: HomeView,
        },
        {
          path: 'about',
          name: 'about',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/AboutView.vue'),
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

export default router
