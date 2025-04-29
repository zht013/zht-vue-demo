<script setup lang="ts">
import { trimEnd } from '@/utils/string'
import type {
  RouteLocationRaw,
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
} from 'vue-router'

defineOptions({
  inheritAttrs: false,
})

const { to } = defineProps<{
  to: RouteLocationRaw // 支持字符串或对象形式的路由目标
}>()

// 获取当前路由
const route = useRoute()

// 计算目标路径，自动包含 locale 参数
const computedTo = computed(() => {
  const locale = route.params.locale as string | undefined // 获取当前路由的 locale 参数
  if (typeof to === 'string') {
    return locale ? trimEnd(`/${locale}${to}`, '\/') : to
  } else if (typeof to === 'object' && (to as RouteLocationAsPathGeneric)) {
    return {
      ...to,
      path: locale
        ? trimEnd(`/${locale}${(to as RouteLocationAsPathGeneric).path}`, '\/')
        : (to as RouteLocationAsPathGeneric).path,
    }
  } else if (typeof to === 'object' && (to as RouteLocationAsRelativeGeneric)) {
    return {
      ...to,
      params: {
        ...(to as RouteLocationAsRelativeGeneric).params,
        locale: locale || (to as RouteLocationAsRelativeGeneric)?.params?.locale, // 确保 locale 参数被包含
      },
    }
  }

  return to
})
</script>

<template>
  <RouterLink :to="computedTo" v-bind="$attrs">
    <slot />
  </RouterLink>
</template>
