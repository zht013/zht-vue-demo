<script setup lang="ts">
import { NDrawer, NDrawerContent, useThemeVars } from 'naive-ui'
import AppHeader from './components/AppHeader.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useAppStore } from '@/stores/app'
import { useMenuStore } from '@/stores/menu'
import AppMenus from './components/AppMenus.vue'
import { useEventBus, useEventListener } from '@vueuse/core'
import { EventKeys } from '@/constants/keys'

defineProps<{
  isRefreshView: boolean
}>()

const route = useRoute()
const themeVars = useThemeVars()
const { isDesktop, isTablet, isMobile } = useAppBreakpoints()
const { routeHistoryEnabled } = storeToRefs(useAppStore())

// route history
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
const viewFullScreen = computed(() => !!route.meta.isFullScreen)
const isSlideNavOpen = ref(isDesktop.value && !viewFullScreen.value)
const isRootSubMenus = computed(() => isDesktop.value)
const isFixAside = computed(() => !isDesktop.value || viewFullScreen.value)
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
  fixed: boolean
}>((previous) => {
  return {
    animate: previous?.fixed == isFixAside.value, // 是否执行 aside 的打开和关闭动画
    show: isSlideNavOpen.value, // 是否显示aside
    fixed: isFixAside.value, // aside 的显示模式
  }
})
const handleSlideToggle = async (state?: boolean) => {
  isSlideNavOpen.value = state ?? !isSlideNavOpen.value

  if (isFixAside.value) {
    if (isSlideNavOpen.value) {
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.documentElement.style.removeProperty('overflow')
    }
  }
}
// 在窗口大小改变时，避免 aside 在关闭状态下执行动画，其实不算一个真正的 case
useEventListener(asideElement, 'transitionend', (e: TransitionEvent) => {
  if (e.propertyName === 'margin-left') {
    asideElement.value?.classList.remove('animate')
  }
})

// 开始导航时是否关闭 aside
onBeforeRouteUpdate(() => {
  if (isFixAside.value && isSlideNavOpen.value && (!isDesktop || !viewFullScreen)) {
    handleSlideToggle(false)
  }
})

useEventBus(EventKeys.toggleAside).on((state) => {
  handleSlideToggle(state)
})

watch(
  () => route.meta.isFullScreen,
  async (value) => {
    if (value) {
      await nextTick()
      handleSlideToggle(false)
    }
  },
)
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
      :mode="isDesktop ? 'inline' : 'slide'"
      :is-slide-nav-open="isSlideNavOpen"
      :toolbar-mode="isMobile ? 'dropdown' : 'inline'"
      @show-settings="handleShowSettings"
      @toggle-slide-nav="handleSlideToggle"
    />

    <div class="content">
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

        <div v-if="isFixAside" class="backdrop" @click="handleSlideToggle()"></div>
        <button v-if="isDesktop" class="slide-btn" @click="handleSlideToggle()" title="">
          <IconIonChevronForward v-if="!isSlideNavOpen" /><IconIonChevronBack v-else />
        </button>
      </aside>

      <div
        class="main-con"
        :style="{
          '--bg-color': themeVars.baseColor,
        }"
      >
        <AppRouteHistory
          v-if="routeHistoryEnabled"
          :style="{
            position: 'sticky',
            top: `var(--app-header-height)`,
            zIndex: 2,
            marginBottom: '1rem',
            height: themeVars.routeHistoryHeight,
            display: viewFullScreen ? 'none' : 'flex',
          }"
        />

        <main>
          <RouterView v-slot="{ Component }">
            <Transition name="default" mode="out-in">
              <component
                v-if="!isRefreshView"
                :is="Component"
                :class="{
                  'view-full-screen': viewFullScreen,
                }"
              />
            </Transition>
          </RouterView>
        </main>
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

.content {
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

  &.fixed {
    position: fixed;
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

.main-con {
  flex: 1;
  padding: 1rem;
  background: var(--bg-color);
  max-width: min(100vw, 100%);
}

.view-full-screen {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.version-info {
  opacity: 0.4;
  flex: 1;
  text-align: center;
}
</style>
