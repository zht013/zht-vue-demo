<script setup lang="ts">
import { NDrawer, NDrawerContent, useThemeVars } from 'naive-ui'
import AppHeader from './components/AppHeader.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useAppStore } from '@/stores/app'
import { useMenuStore } from '@/stores/menu'
import AppMenus from './components/AppMenus.vue'
import { useEventListener } from '@vueuse/core'

defineProps<{
  isRefreshView: boolean
}>()

const themeVars = useThemeVars()
const { isDesktop, isTablet, isMobile } = useAppBreakpoints()

// route history
const { routeHistoryEnabled } = storeToRefs(useAppStore())
const AppRouteHistory = defineAsyncComponent(() => import('./components/AppRouteHistory.vue'))

// settings viewer
const settingsDrawerWidth = computed(() => {
  return isDesktop.value ? '35%' : isTablet.value ? '50%' : '100%'
})
const isShowSettings = ref(false)
const handleShowSettings = () => {
  isShowSettings.value = !isShowSettings.value
}

// slide nav aside
const asideElement = useTemplateRef('aside')
const menuStore = useMenuStore()
const isSlideNavOpen = ref(isDesktop.value)
const isRootSubMenus = computed(() => isDesktop.value)
const isFloatAside = computed(() => !isDesktop.value)
const targetMenus = computed(() => {
  return isRootSubMenus.value ? (menuStore.rootMenu?.children ?? []) : menuStore.menus
})
const dynamicAsideWidth = computed(() => {
  if (isDesktop.value) {
    return themeVars.value.appAsideWidth
  } else if (isTablet.value) {
    return '36%'
  } else {
    return '100%'
  }
})
const asideClass = computed<{
  animate: boolean
  show: boolean
  float: boolean
}>((previous) => {
  return {
    animate: previous?.float == isFloatAside.value,
    show: isSlideNavOpen.value,
    float: isFloatAside.value,
  }
})
const handleSlideToggle = async (state?: boolean) => {
  isSlideNavOpen.value = state ?? !isSlideNavOpen.value

  if (isFloatAside.value) {
    if (isSlideNavOpen.value) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.removeProperty('overflow')
    }
  }
}
useEventListener(asideElement, 'transitionend', (e: TransitionEvent) => {
  if (e.propertyName === 'margin-left') {
    asideElement.value?.classList.remove('animate')
  }
})

onBeforeRouteUpdate(() => {
  if (isFloatAside.value && isSlideNavOpen.value) {
    handleSlideToggle(false)
  }
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
    <AppHeader
      class="header"
      :mode="isFloatAside ? 'slide' : 'inline'"
      :is-slide-nav-open="isSlideNavOpen"
      :toolbar-mode="isMobile ? 'dropdown' : 'inline'"
      @show-settings="handleShowSettings"
      @toggle-slide-nav="handleSlideToggle"
    />

    <div class="main">
      <aside
        ref="aside"
        class="aside"
        :class="asideClass"
        :style="{
          '--border-color': themeVars.borderColor,
          '--divider-color': themeVars.dividerColor,
          '--hover-color': themeVars.hoverColor,
          '--aside-width': dynamicAsideWidth,
          '--backdrop-color': themeVars.backdropColor,
          '--bg-color': themeVars.bgColor1,
        }"
      >
        <nav class="nav hover-scrollbar">
          <AppMenus :menus="targetMenus" :tree-mode="!isRootSubMenus">
            <template v-if="isRootSubMenus" #prepend>
              <label>{{ $t('label.start') }}</label>
            </template>
          </AppMenus>
        </nav>

        <div v-if="isFloatAside" class="backdrop" @click="handleSlideToggle()"></div>
        <button v-else class="slide-btn" @click="handleSlideToggle()" title="">
          <IconIonChevronForward v-if="!isSlideNavOpen" /><IconIonChevronBack v-else />
        </button>
      </aside>

      <div
        class="content"
        :style="{
          '--bg-color': themeVars.baseColor,
        }"
      >
        <div
          v-if="routeHistoryEnabled"
          class="route-tabs"
          :style="{
            '--tabs-height': themeVars.routeHistoryHeight,
          }"
        >
          <AppRouteHistory :height="themeVars.routeHistoryHeight" />
        </div>

        <RouterView v-slot="{ Component }">
          <Transition name="default" mode="out-in">
            <component v-if="!isRefreshView" :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>

    <NDrawer v-model:show="isShowSettings" :width="settingsDrawerWidth" placement="right">
      <NDrawerContent closable :title="$t('title.settings')">
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

/* #region aside */
.aside {
  position: sticky;
  top: var(--app-header-height);
  z-index: 2;
  height: calc(100vh - var(--app-header-height) - 1px);
  border-right: 1px solid var(--border-color);
  margin-left: calc(var(--aside-width) * -1);
  width: var(--aside-width);

  &.animate {
    transition: margin-left 260ms ease-out;
  }

  &.show {
    margin-left: 0;

    &:hover > .slide-btn {
      transform: translate(100%, -100%);
    }

    & > .slide-btn {
      transform: translate(-100%, -100%);
    }

    & > .backdrop {
      display: block;
      animation: aside-fadeIn 0.8s forwards;
    }
  }

  &.float {
    position: absolute;
    z-index: 4;

    & > .nav {
      backdrop-filter: blur(1rem);
    }
  }

  .nav {
    position: relative;
    z-index: 2;
    height: 100%;
    background: var(--bg-color);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 1rem 0.4rem;
  }

  .slide-btn {
    z-index: 1;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(100%, -100%);
    margin: 0;
    padding: 3rem 0.4rem;
    transition: transform 300ms ease-in 300ms;
    line-height: 1;
    border: 1px solid var(--border-color);
    border-left-width: 0;
    border-radius: 0 0.4rem 0.4rem 0;
    background: var(--bg-color);
    backdrop-filter: blur(5px);
    cursor: pointer;
  }

  .backdrop {
    position: fixed;
    z-index: 1;
    background: var(--backdrop-color);
    left: 0;
    top: var(--app-header-height);
    right: 0;
    bottom: 0;
    display: none;
    opacity: 0;
    animation: aside-fadeOut 0.8s forwards;
  }
}

@keyframes aside-fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes aside-fadeOut {
  from {
    display: block;
    opacity: 1;
  }
  to {
    display: none;
    opacity: 0;
  }
}
/* #endregion */

.content {
  flex: 1;
  padding: 1rem;
  background: var(--bg-color);
  max-width: min(100vw, 100%);
}

.route-tabs {
  position: sticky;
  top: var(--app-header-height);
  z-index: 2;
  margin-bottom: 1rem;
  height: var(--tabs-height);
}

.version-info {
  opacity: 0.4;
  flex: 1;
  text-align: center;
}
</style>
