<script setup lang="ts">
import { trimEnd } from '@/utils/string'
import type {
  RouteLocationAsPathGeneric,
  RouteLocationAsRelativeGeneric,
  RouterLinkProps,
} from 'vue-router'

// defineOptions({
//   inheritAttrs: false,
// })

const props = defineProps<RouterLinkProps>()

const route = useRoute()
const newProps = {
  ...props,
  to: resetTo(),
}

// 计算目标路径，自动包含 locale 参数
function resetTo() {
  const locale = route.params.locale as string | undefined // 获取当前路由的 locale 参数
  if (typeof props.to === 'string') {
    return locale ? trimEnd(`/${locale}${props.to}`, '\/') : props.to
  } else if (typeof props.to === 'object' && (props.to as RouteLocationAsPathGeneric)) {
    return {
      ...props.to,
      path: locale
        ? trimEnd(`/${locale}${(props.to as RouteLocationAsPathGeneric).path}`, '\/')
        : (props.to as RouteLocationAsPathGeneric).path,
    }
  } else if (typeof props.to === 'object' && (props.to as RouteLocationAsRelativeGeneric)) {
    return {
      ...props.to,
      params: {
        ...(props.to as RouteLocationAsRelativeGeneric).params,
        locale: locale || (props.to as RouteLocationAsRelativeGeneric)?.params?.locale, // 确保 locale 参数被包含
      },
    }
  }

  return props.to
}
</script>

<template>
  <RouterLink v-bind="newProps" v-slot="slotProps">
    <slot v-bind="slotProps" />
  </RouterLink>
</template>
