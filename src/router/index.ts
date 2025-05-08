import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router'
import {
  defaultLocale,
  isLocaleSupported,
  setLocale,
  supportedLocales,
  type SupportedLocale,
} from '@/i18n'
import appLoadingBar from '@/helpers/AppLoadingBar'
import LayoutControllerView from '@/views/layouts/LayoutControllerView.vue'

/**
 * 自动导入全部静态路由，无需再手动引入！匹配 src/router/modules 目录（任何嵌套级别）中具有 .ts 扩展名的所有文件，除了 remaining.ts 文件
 * 如何匹配所有文件请看：https://github.com/mrmlnc/fast-glob#basic-syntax
 * 如何排除文件请看：https://cn.vitejs.dev/guide/features.html#negative-patterns
 */
const routesMap = import.meta.glob(['./routes/**/*.ts'], {
  eager: true,
})

/**
 * 所有 routes 文件夹下的路由信息
 * 按 index 升序排序
 */
const routes = Object.keys(routesMap)
  .map((key) => (routesMap[key] as { default: RouteRecordRaw }).default)
  .sort((a: RouteRecordRaw, b: RouteRecordRaw) => {
    if (!a.meta?.index) {
      return -1
    } else if (!b.meta?.index) {
      return 0
    } else {
      return a.meta.index - b.meta.index
    }
  })

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
      path: `/:locale(${supportedLocales.map((locale) => locale.code).join('|')})?`,
      component: LayoutControllerView,
      beforeEnter: async (to) => {
        // 如果没有传入语言参数，则使用浏览器语言或默认语言
        const locale = to.params.locale || navigator.language || defaultLocale
        if (typeof locale === 'string' && !isLocaleSupported(locale as SupportedLocale)) {
          return { ...to, params: { locale: defaultLocale } } // 重定向到默认语言
        } else {
          await setLocale(locale as SupportedLocale) // 设置语言
        }
      },
      children: routes,
    },
    {
      path: `/:locale?/:pathMatch(.*)*`,
      redirect: (to) => {
        const locale = to.params.locale

        return {
          path: locale && isLocaleSupported(locale as SupportedLocale) ? `/${locale}` : '/',
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

  document.title = `${to.meta?.label ? to.meta.label() + ' - ' : ''}${import.meta.env.VITE_APP_TITLE}`
})

router.onError(() => {
  // 导航错误时加载条
  appLoadingBar.error()
})

/**
 * 删除当前路由的查询参数
 * @param to 当前路由
 * @returns
 */
function removeQueryParams(to: RouteLocationNormalized) {
  if (Object.keys(to.query).length) return { path: to.path, query: {}, hash: to.hash }
}

/**
 * 删除当前路由的 hash
 * @param to 当前路由
 * @returns
 */
function removeHash(to: RouteLocationNormalized) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

export { routes, removeHash, removeQueryParams }

export default router
