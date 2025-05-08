<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import AppHeader from './components/AppHeader.vue'
import AppAsideNav from './components/AppAsideNav.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'

const themeVars = useThemeVars()
const { isDesktop } = useAppBreakpoints()
const hideAside = ref(false)

function handleAsideToggle() {
  hideAside.value = !hideAside.value
}
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
      <div
        v-if="isDesktop"
        class="aside-wrap"
        :class="{ 'hide-aside': hideAside }"
        :style="{
          '--aside-width': themeVars.appAsideWidth,
          '--border-color': themeVars.borderColor,
          '--bg-color': themeVars.bgColor1,
        }"
      >
        <AppAsideNav class="aside" />

        <button class="toggle-btn" @click="handleAsideToggle">
          <IconIonChevronForward v-if="hideAside" /> <IconIonChevronBack v-else />
        </button>
      </div>

      <div
        class="content"
        :style="{
          '--bg-color': themeVars.baseColor,
        }"
      >
        <RouterView v-slot="{ Component }">
          <Transition name="default" mode="out-in">
            <component :is="Component" />
          </Transition>
        </RouterView>
      </div>
    </div>
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

.aside-wrap {
  z-index: 2;
  position: sticky;
  top: 4.8rem;
  height: calc(100vh - var(--app-header-height));

  &.hide-aside {
    & > .aside {
      margin-left: calc(var(--aside-width) * -1);
    }

    & > .toggle-btn {
      transform: translateX(100%) translateY(-100%);
    }
  }

  &:hover {
    & > .toggle-btn {
      transform: translateX(100%) translateY(-100%);
    }
  }
}

.aside {
  width: var(--aside-width);
  position: relative;
  z-index: 2;
  height: 100%;
  border-right: 1px solid var(--border-color);
  background-color: var(--bg-color);
  overflow-x: hidden;
  overflow-y: auto;
  transition: margin-left 300ms ease-out;
  margin-left: var(--margin-left);
}

.content {
  flex: 1;
  padding: 1rem;
  background-color: var(--bg-color);
}

.toggle-btn {
  z-index: 1;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateX(0) translateY(-100%);
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
</style>
