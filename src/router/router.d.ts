// typings.d.ts or router.ts
import { FunctionalComponent } from 'vue'
import type { LayoutType } from '../types'
import 'vue-router'
import type { RouteIndex } from './constants'

declare module 'vue-router' {
  /**
   * route.meta类型定义
   */
  interface RouteMeta {
    /** 唯一标识 */
    id?: string
    /**序号 */
    index?: RouteIndex
    /** 是否需要授权 */
    requireAuth?: boolean
    /** 菜单名称 */
    name?: () => string
    /** 页面标题 */
    title?: () => string
    /** 图标 */
    icon?: string | FunctionalComponent
    /** 是否显示为菜单 */
    isMenu?: boolean
    /** layout */
    layout?: LayoutType
  }
}
