<script setup lang="ts">
import { RouteName } from '@/router/constants'
</script>

<template>
  <div class="layout">
    <RouterLink :to="{ name: RouteName.APP_HOME }">返回</RouterLink>
    <RouterView />
  </div>
</template>

<style scoped></style>
