<script setup lang="ts">
import { useDebounceFn, useResizeObserver } from '@vueuse/core'
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
import type { EChartsOption } from 'echarts'

type extension = Exclude<Parameters<typeof echarts.use>[0], Array<unknown>>

const { extensions = [], option } = defineProps<{
  option: EChartsOption
  extensions: extension[]
  theme?: string | object
}>()

let echartsInstance: echarts.ECharts
const defaultComponents: extension[] = [
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]
// 注册必须的组件
echarts.use([...defaultComponents, ...extensions])

const chartContainerRef = useTemplateRef('chartContainerRef')

watch(
  () => option.dataset,
  async () => {
    echartsInstance.hideLoading()

    await nextTick()

    echartsInstance.setOption(option)
  },
)

useResizeObserver(
  chartContainerRef,
  useDebounceFn(() => {
    echartsInstance?.resize()
  }, 200),
)

onMounted(() => {
  echartsInstance = echarts.init(chartContainerRef.value)
  echartsInstance.showLoading()
})

onBeforeUnmount(() => {
  echartsInstance?.dispose()
})
</script>

<template>
  <div ref="chartContainerRef" class="v-root"></div>
</template>

<style scoped>
.v-root :deep(> div:has(> canvas)) {
  height: 100% !important;
  width: 100% !important;
}
</style>
