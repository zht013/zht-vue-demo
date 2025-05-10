<script setup lang="ts">
import { NDrawer, NDrawerContent, useThemeVars } from 'naive-ui'
import AppHeader from './components/AppHeader.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useAppI18n } from '@/composables/appI18n'
import { useEventBus } from '@vueuse/core'
import { EventKeys } from '@/constants/keys'
import AppAside from './components/AppAside.vue'

defineProps<{
  isRefreshView: boolean
}>()

const themeVars = useThemeVars()
const { t } = useAppI18n()

const { isDesktop, isTablet } = useAppBreakpoints()

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
    }"
  >
    <AppHeader class="header" />

    <div class="main">
      <AppAside />

      <div
        class="content"
        :style="{
          '--bg-color': themeVars.baseColor,
        }"
      >
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

.content {
  flex: 1;
  padding: 1rem;
  background: var(--bg-color);
}

.version-info {
  opacity: 0.4;
  flex: 1;
  text-align: center;
}
</style>
