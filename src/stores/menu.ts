import { routes } from '@/router'
import type { AppMenu } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

export const useMenuStore = defineStore('menu', () => {
  const router = useRouter()
  const route = useRoute()
  const menus = convertRoutesToMenus()

  // 当前菜单项
  const currentMenu = computed<AppMenu | undefined>(() => {
    const currentRouteKey = route.matched.at(-1)?.meta?.key

    return currentRouteKey ? getMenu(currentRouteKey) : undefined
  })

  // 根路由项
  const rootRoute = computed(() => {
    return route.matched.find((r) => r.meta?.isMenu)
  })

  // 根菜单项
  const rootMenu = computed<AppMenu | undefined>(() => {
    const rootRouteKey = rootRoute.value?.meta?.key
    return rootRouteKey ? getMenu(rootRouteKey) : undefined
  })

  /**
   * 根据菜单标识获取当前菜单
   * @param key 菜单标识
   * @returns 当前菜单
   */
  function getMenu(key: string | number, sourceMenus: AppMenu[] = menus): AppMenu | undefined {
    for (const menuItem of sourceMenus) {
      if (menuItem.key === key) return menuItem

      if (menuItem.children?.length) {
        const menu = getMenu(key, menuItem.children)

        if (menu) return menu
      }
    }

    return undefined
  }

  /**
   * 转换路由列表为菜单列表
   * @param sourceRoutes 需要转换的路由列表
   * @param parentMenu 父菜单
   * @returns
   */
  function convertRoutesToMenus(
    sourceRoutes: RouteRecordRaw[] = routes,
    parentMenu?: AppMenu,
  ): AppMenu[] {
    const totalMenus: AppMenu[] = []
    // 国际化路径标识
    const localePath = route.params.locale ? `/${route.params.locale}/` : '/'
    for (const sourceRoute of sourceRoutes) {
      if (sourceRoute.meta?.isMenu) {
        const menuKey =
          sourceRoute.meta?.index?.toString() ?? sourceRoutes.indexOf(sourceRoute).toString()
        const resolvedSourceRoute = router.resolve(sourceRoute)
        const menu: AppMenu = {
          key: parentMenu ? `${parentMenu.key}-${menuKey}` : menuKey,
          label: sourceRoute.meta?.label ?? '',
          path: resolvedSourceRoute.fullPath.replace(localePath, ''),
          routeName: sourceRoute.name,
          isGroup: sourceRoute.component ? false : true,
        }

        sourceRoute.meta.key = menu.key

        // 如果有 children，递归调用
        if (sourceRoute.children?.length) {
          const subMenus = convertRoutesToMenus(sourceRoute.children, menu)
          if (subMenus.length > 0) {
            menu.children = subMenus
          }
        }

        totalMenus.push(menu)
      }
    }

    return totalMenus
  }

  return {
    /** 菜单列表 */
    menus,
    /** 根菜单项 */
    rootMenu,
    /** 当前带单项 */
    currentMenu,
  }
})
