<script setup lang="ts">
import { RouteName } from '@/router/constants'
import { NIcon, NButton, useThemeVars } from 'naive-ui'
import { RouterLink } from 'vue-router'
import AppToolBar from './AppToolBar.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useMenusStore } from '@/stores/menu'
import { useAppI18n } from '@/composables/appI18n'
import { useToggle } from '@vueuse/core'

const { t } = useAppI18n()
const themeVars = useThemeVars()
const { menus } = useMenusStore()
const { isSlideMenusShow } = storeToRefs(useMenusStore())
const { isDesktop, isMobile } = useAppBreakpoints()

// 显示或隐藏侧边菜单
const toggleSlideMenus = useToggle(isSlideMenusShow)
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

    <nav v-if="isDesktop" class="nav">
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
    <NButton v-else quaternary @click="toggleSlideMenus()" class="menu-btn">
      <template #icon>
        <NIcon>
          <IconIonCloseOutline v-if="isSlideMenusShow" />
          <IconIonMenuSharp v-else />
        </NIcon>
      </template>

      {{ t('label.menu') }}
    </NButton>

    <AppToolBar :mode="isMobile ? 'dropdown' : 'list'" />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  padding: 0.4rem 1rem 0.4rem 1.4rem;
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

.nav {
  flex: 1;
}

.menu-btn {
  margin-right: auto;
}
</style>
