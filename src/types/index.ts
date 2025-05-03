import type { RouteRecordNameGeneric } from 'vue-router'

/** app 布局类型 */
export enum LayoutType {
  default = 'default',
  dvProject = 'dv-project',
}

export interface LayoutOptions {
  /** 布局名称 */
  name: string
  /** 布局类型 */
  type: LayoutType
  /** 布局组件 */
  component: Component
  /** 布局图标 */
  icon?: string
}

export interface AppMenu {
  id: string
  name: () => string
  href: string
  routeName?: RouteRecordNameGeneric
  children?: AppMenu[]
}
