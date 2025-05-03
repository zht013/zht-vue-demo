<script setup lang="ts">
import { LayoutType } from '@/types'
import emitter, { EventKeys } from '@/helpers/AppEmitter'
import { layoutMap } from '@/constants/layout'

const route = useRoute()
const layout = ref<LayoutType | undefined>()

watchEffect(() => {
  layout.value = route.meta?.layout ?? LayoutType.default
})

emitter.on(EventKeys.LAYOUT_CHANGED, (layoutType: LayoutType) => {
  layout.value = layoutType
})

onUnmounted(() => {
  emitter.off(EventKeys.LAYOUT_CHANGED)
})
</script>

<template>
  <component v-if="layout" :is="layoutMap[layout].component" />
  <router-view v-else />
</template>

<style scoped></style>
