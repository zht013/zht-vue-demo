<script setup lang="ts">
// import type { AppMenu } from '@/types'
import AppNavTools from './AppNavTools.vue'

// const { menus = [] } = defineProps<{
//   menus?: AppMenu[]
// }>()

// function renderMenuLabel(option: AppMenu) {
//   return typeof option.label === 'function' ? option.label() : option.label
// }
</script>

<template>
  <nav>
    <AppNavTools />
  </nav>
</template>

<style scoped></style>
