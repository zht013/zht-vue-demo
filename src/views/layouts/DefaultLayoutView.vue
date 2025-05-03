<script setup lang="ts">
import { useNavStore } from '@/stores/nav'
import AppHeader from './components/AppHeader.vue'
import { useThemeVars } from 'naive-ui'

const { menus } = useNavStore()
const themeVars = useThemeVars()
</script>

<template>
  <div
    class="layout"
    :style="{
      '--app-bg-color': themeVars.bgColor,
      '--app-box-shadow4': themeVars.boxShadow4,
    }"
  >
    <AppHeader class="header" :menus="menus" />

    <main class="main">
      <RouterView v-slot="{ Component }">
        <Transition name="default" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}

.header {
  position: sticky;
  top: 0;
  padding: 0.4rem 0.6rem 0.4rem 1.4rem;
}

.main {
  min-height: 300rem;
}
</style>
