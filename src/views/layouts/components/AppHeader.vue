<script setup lang="ts">
import { RouteName } from '@/router/constants'
import { NIcon, NButton, useThemeVars } from 'naive-ui'
import { RouterLink } from 'vue-router'
import AppToolBar from './AppToolBar.vue'
import { useMenuStore } from '@/stores/menu'
import { useAppI18n } from '@/composables/appI18n'
import type { AppHeaderNavMode, AppToolbarMode } from '@/types'

defineEmits<{
  toggleSlideNav: []
  showSettings: []
}>()

const { mode = 'inline', isSlideNavOpen = true } = defineProps<{
  isSlideNavOpen?: boolean
  toolbarMode?: AppToolbarMode
  mode?: AppHeaderNavMode
}>()

const { t } = useAppI18n()
const themeVars = useThemeVars()
const { menus } = useMenuStore()
</script>

<template>
  <header
    class="header-root"
    :style="{
      '--bg-color': themeVars.bgColor,
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

    <nav v-if="mode === 'inline'" class="nav">
      <RouterLink
        v-for="menu in menus"
        :key="menu.key"
        :to="{
          name: menu.routeName,
        }"
      >
        {{ typeof menu.label === 'function' ? menu.label() : menu.label }}
      </RouterLink>
    </nav>
    <NButton v-else quaternary @click="$emit('toggleSlideNav')" class="menu-btn">
      <template #icon>
        <NIcon>
          <IconIonCloseOutline v-if="isSlideNavOpen" />
          <IconIonMenuSharp v-else />
        </NIcon>
      </template>

      {{ t('label.menu') }}
    </NButton>

    <AppToolBar :mode="toolbarMode" @show-settings="$emit('showSettings')" />
  </header>
</template>

<style scoped>
.header-root {
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem 0.4rem 1.4rem;
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(2px);
  background-image: radial-gradient(transparent 0.1rem, var(--bg-color) 0.1rem);
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

.nav {
  flex: 1;
}

.menu-btn {
  margin-right: auto;
}
</style>
