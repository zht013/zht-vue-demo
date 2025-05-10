<script setup lang="ts">
import { RouteName } from '@/router/constants'

defineProps<{
  isRefreshView: boolean
}>()
</script>

<template>
  <div>
    <RouterLink :to="{ name: RouteName.VUE3.INTRODUCE }">返回</RouterLink>
    <RouterView v-slot="{ Component }">
      <component v-if="!isRefreshView" :is="Component" />
    </RouterView>
  </div>
</template>

<style scoped></style>
