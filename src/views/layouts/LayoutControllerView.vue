<script setup lang="ts">
import { LayoutType } from '@/types'
import { layoutMap } from '@/constants/data'
import { useEventBus } from '@vueuse/core'
import { EventKeys } from '@/constants/keys'
import { useThemeVars } from 'naive-ui'

defineProps<{
  isRefreshView: boolean
}>()

const route = useRoute()
const layout = ref<LayoutType | undefined>()

watchEffect(() => {
  layout.value = route.meta?.layout ?? LayoutType.default
})

// 监听布局变化的全局事件
useEventBus(EventKeys.layoutChanged).on((value: LayoutType) => {
  layout.value = value
})

const themeVars = useThemeVars()
</script>

<template>
  <component
    v-if="layout"
    :is="layoutMap[layout].component"
    :is-refresh-view="isRefreshView"
    :style="{
      '--a-text-color': themeVars.textColor1,
      '--a-hover-color': themeVars.primaryColor,
      '--btn-bg-color': themeVars.tabColor,
      '--btn-bg-hover-color': themeVars.hoverColor,
      '--btn-border-color': themeVars.borderColor,
    }"
  />
</template>

<style>
a {
  color: var(--a-text-color);
  text-decoration: none;
  transition: color 0.3s ease;
  padding: 0.7rem 1.2rem;
}

a:visited {
  color: var(--a-text-color);
}

a:is(:hover, .router-link-active) {
  color: var(--a-hover-color);
}

a:active {
  color: rgb(214, 4, 168);
}

button {
  color: var(--a-text-color);
  background: var(--btn-bg-color);
  border: 1px solid var(--btn-border-color);
  border-radius: 0.4rem;
  padding: 0.6rem 1.2rem;
  cursor: pointer;

  &:hover {
    background: var(--btn-bg-hover-color);
  }
}
</style>
