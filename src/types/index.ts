import type { MenuOption } from 'naive-ui'
import type { VNodeChild } from 'vue'
import type { RouteRecordNameGeneric } from 'vue-router'

/** 布局类型 */
export enum LayoutType {
  /** 默认布局 */
  default = 'default',
  /** 可视化示例项目的布局 */
  dvProject = 'dv-project',
}

export interface LayoutOption {
  /** 布局名称 */
  name: string
  /** 布局类型 */
  type: LayoutType
  /** 布局组件 */
  component: Component
  /** 布局的图标 */
  icon?: string
}

export type AppMenu = MenuOption & {
  /** 不带国际化的相对路径 */
  path?: string
  /** 导航的目标路由名称 */
  routeName?: RouteRecordNameGeneric
  /** 路由是否只是分组作用 */
  isGroup?: boolean
  /** 路由的标签名称 */
  label?: (() => string) | string | (() => VNodeChild)
  /** 包含的子路由 */
  children?: AppMenu[]
}
