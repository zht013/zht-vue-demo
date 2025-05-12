<script setup lang="ts">
import { NDrawer, NDrawerContent, useThemeVars } from 'naive-ui'
import AppHeader from './components/AppHeader.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useAppI18n } from '@/composables/appI18n'
import { useEventBus } from '@vueuse/core'
import { EventKeys } from '@/constants/keys'
import AppAside from './components/AppAside.vue'
import { useAppStore } from '@/stores/app'

defineProps<{
  isRefreshView: boolean
}>()

const themeVars = useThemeVars()
const { t } = useAppI18n()
const { isDesktop, isTablet } = useAppBreakpoints()

const { routeHistoryEnabled } = storeToRefs(useAppStore())
const AppRouteHistory = defineAsyncComponent(() => import('./components/AppRouteHistory.vue'))

// settings 相关
const settingsDrawerWidth = computed(() => {
  return isDesktop.value ? '35%' : isTablet.value ? '50%' : '100%'
})
const isShowSettings = ref(false)
useEventBus(EventKeys.showSettings).on(() => {
  isShowSettings.value = !isShowSettings.value
})
</script>

<template>
  <div
    class="layout"
    :style="{
      '--app-header-height': themeVars.appHeaderHeight,
      '--bg-color1': themeVars.bgColor1,
    }"
  >
    <AppHeader class="header" />

    <div class="main">
      <AppAside
        class="aside"
        :aside-width="themeVars.appAsideWidth"
        :style="{
          '--bg-color': isDesktop ? themeVars.bgColor1 : themeVars.bgColor,
        }"
      />

      <div
        class="content"
        :style="{
          '--bg-color': themeVars.baseColor,
        }"
      >
        <div
          v-if="routeHistoryEnabled"
          :style="{
            height: themeVars.routeHistoryHeight,
            marginBottom: '1rem',
          }"
        >
          <AppRouteHistory class="route-tabs" :height="themeVars.routeHistoryHeight" />
        </div>

        <RouterView v-slot="{ Component }">
          <Transition name="default" mode="out-in">
            <component v-if="!isRefreshView" :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>

    <NDrawer v-model:show="isShowSettings" :width="settingsDrawerWidth" placement="right">
      <NDrawerContent closable :title="t('title.settings')">
        <AppSettings />

        <template #footer>
          <VersionInfo class="version-info" />
        </template>
      </NDrawerContent>
    </NDrawer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-flow: column nowrap;
  min-height: 100vh;
  background: var(--bg-color1);
}

.header {
  position: sticky;
  top: 0;
  z-index: 4;
  height: var(--app-header-height);
}

.main {
  flex: 1;
  display: flex;
  flex-flow: row wrap;
}

.aside {
  position: sticky;
  top: var(--app-header-height);
  z-index: 2;
}

.content {
  flex: 1;
  padding: 1rem;
  background: var(--bg-color);
}

.route-tabs {
  position: sticky;
  top: var(--app-header-height);
  z-index: 2;
}

.version-info {
  opacity: 0.4;
  flex: 1;
  text-align: center;
}
</style>
