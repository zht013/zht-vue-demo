<script setup lang="ts">
import { useAppI18n } from '@/composables/appI18n'
import { RouteName } from '@/router/constants'
import { NDrawer, NIcon, NDrawerContent, useThemeVars } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { useMenuStore } from '@/stores/menu'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useEventBus } from '@vueuse/core'
import { EventKeys } from '@/constants/keys'

const { menus } = useMenuStore()
const { t } = useAppI18n()
const settingsShow = ref(false)
const AppNav = defineAsyncComponent(() => import('./AppNav.vue'))
const AppNavMini = defineAsyncComponent(() => import('./AppNavMini.vue'))
const AppNavMd = defineAsyncComponent(() => import('./AppNavMd.vue'))

const { isTablet, isDesktop } = useAppBreakpoints()

const themeVars = useThemeVars()

useEventBus(EventKeys.showSettings).on(() => {
  settingsShow.value = !settingsShow.value
})
</script>

<template>
  <header
    class="header"
    :style="{
      '--background-color': themeVars.bgColor,
      '--border-color': themeVars.borderColor,
    }"
  >
    <RouterLink
      class="logo"
      :to="{
        name: RouteName.VUE3.ROOT,
      }"
    >
      <NIcon size="2.2rem">
        <IconCustomLogo />
      </NIcon>
    </RouterLink>

    <AppNav v-if="isDesktop" :menus="menus" />
    <AppNavMd v-else-if="isTablet" :menus="menus" />
    <AppNavMini v-else :menus="menus" />

    <NDrawer v-model:show="settingsShow" default-width="35%" placement="right">
      <NDrawerContent closable :title="t('title.settings')">
        <AppSettings />

        <template #footer>
          <VersionInfo class="version-info" />
        </template>
      </NDrawerContent>
    </NDrawer>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0.4rem 0.6rem 0.4rem 1.4rem;
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(2px);
  background-image: radial-gradient(transparent 0.1rem, var(--background-color) 0.1rem);
  background-size: 0.4rem 0.4rem;
}

.logo {
  flex-shrink: 0;
  line-height: 1;
  filter: hue-rotate(0deg);
  transition: filter 400ms ease-in;
}

.logo:is(:hover, .router-link-active) {
  filter: hue-rotate(320deg);
}

.logo.router-link-active:hover {
  filter: hue-rotate(0deg);
}

.version-info {
  opacity: 0.4;
  flex: 1;
  text-align: center;
}
</style>
