<script setup lang="ts">
import { type AppMenu } from '@/types'
import AppNavTools from './AppNavTools.vue'

const { menus = [] } = defineProps<{
  menus?: AppMenu[]
}>()
</script>

<template>
  <nav class="nav">
    <RouterLink
      v-for="menu in menus"
      :key="menu.key"
      :to="{
        name: menu.routeName,
      }"
    >
      {{ typeof menu.label === 'function' ? menu.label() : menu.label }}
    </RouterLink>

    <AppNavTools class="tools" />
  </nav>
</template>

<style scoped>
.nav {
  flex: 1;
  display: flex;
  align-items: center;
}

.tools {
  margin-left: auto;
  display: flex;
  flex-wrap: nowrap;
}
</style>
