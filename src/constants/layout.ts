import { LayoutType, type LayoutOption } from '@/types'

const layoutMap: Record<LayoutType, LayoutOption> = {
  [LayoutType.default]: {
    name: '默认布局',
    type: LayoutType.default,
    component: defineAsyncComponent(() => import('@/views/layouts/DefaultLayoutView.vue')),
  },
  [LayoutType.dvProject]: {
    name: '示例项目',
    type: LayoutType.dvProject,
    component: defineAsyncComponent(() => import('@/views/layouts/DvProjectLayoutView.vue')),
  },
}

export { layoutMap }
