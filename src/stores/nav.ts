import { routes } from '@/router'
import type { AppMenu } from '@/types'
import type { RouteRecordRaw } from 'vue-router'

export const useNavStore = defineStore('nav', () => {
  const router = useRouter()
  const route = useRoute()
  const menus = convertRoutesToMenus()

  const currentMenu = computed<AppMenu | undefined>(() => {
    const currentMatched = route.matched.at(-1)
    const currentMenuId = router.getRoutes().find((r) => r.path === currentMatched?.path)?.meta.id

    return currentMenuId ? getCurrentMenu(currentMenuId) : undefined
  })

  /**
   * 根据菜单标识获取当前菜单
   * @param id 菜单标识
   * @returns 当前菜单
   */
  function getCurrentMenu(id: string, sourceMenus: AppMenu[] = menus): AppMenu | undefined {
    for (const menuItem of sourceMenus) {
      if (menuItem.id === id) return menuItem

      if (menuItem.children && menuItem.children.length > 0) {
        const menu = getCurrentMenu(id, menuItem.children)

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
    for (const route of sourceRoutes) {
      if (route.meta?.isMenu) {
        const menuId = route.meta?.index?.toString() ?? sourceRoutes.indexOf(route).toString()
        const resolvedRoute = router.resolve(route)
        const menu: AppMenu = {
          id: parentMenu ? `${parentMenu.id}-${menuId}` : menuId,
          name: route.meta?.name ?? (() => ''),
          href: resolvedRoute.href,
          routeName: route.name,
        }

        route.meta.id = menu.id

        // 如果有 children，递归调用
        if (route.children && route.children.length > 0) {
          const subMenus = convertRoutesToMenus(route.children, menu)
          if (subMenus.length > 0) {
            menu.children = subMenus
          }
        }

        totalMenus.push(menu)
      }
    }

    return totalMenus
  }

  return { menus, currentMenu }
})
