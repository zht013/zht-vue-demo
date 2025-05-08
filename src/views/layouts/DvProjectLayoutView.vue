<script setup lang="ts">
import { RouteName } from '@/router/constants'
</script>

<template>
  <div>
    <RouterLink :to="{ name: RouteName.VUE3.INTRODUCE }">返回</RouterLink>
    <RouterView />
  </div>
</template>

<style scoped></style>
