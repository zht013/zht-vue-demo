<script setup lang="ts">
import { useMenusStore } from '@/stores/menu'
import { type AppMenu } from '@/types'
import { useThemeVars } from 'naive-ui'
import AppMenus from './AppMenus.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useEventListener } from '@vueuse/core'

const themeVars = useThemeVars()
const { isDesktop, isTablet } = useAppBreakpoints()
const menusStore = useMenusStore()
const menus = computed<AppMenu[]>(() => {
  return isDesktop.value ? (menusStore.rootMenu?.children ?? []) : menusStore.menus
})
const asideWidth = computed(() => {
  return isDesktop.value ? themeVars.value.appAsideWidth : isTablet.value ? '36%' : '100%'
})

// 监听动画结束，添加 class 以便在屏幕改变时不执行 transition
const aside = useTemplateRef('aside')
aside.value?.classList.add('animated')
useEventListener(aside, 'transitionend', () => {
  aside.value?.classList.add('animated')
})

watch(
  () => menusStore.isSlideMenusShow,
  async () => {
    aside.value?.classList.remove('animated')
  },
)

onBeforeRouteUpdate(() => {
  if (!isDesktop.value && menusStore.isSlideMenusShow) {
    menusStore.isSlideMenusShow = false
  }
})

// 切换导航栏的显示和隐藏
function toggleSlideMenus() {
  menusStore.isSlideMenusShow = !menusStore.isSlideMenusShow
}
</script>

<template>
  <aside
    ref="aside"
    class="aside"
    :class="{
      show: menusStore.isSlideMenusShow,
      float: !isDesktop,
    }"
    :style="{
      '--border-color': themeVars.borderColor,
      '--divider-color': themeVars.dividerColor,
      '--hover-color': themeVars.hoverColor,
      '--bg-color': isDesktop ? themeVars.bgColor1 : themeVars.bgColor,
      '--aside-width': asideWidth,
      '--backdrop-color': themeVars.backdropColor,
    }"
  >
    <template v-if="isDesktop">
      <nav class="nav hover-scrollbar">
        <AppMenus :menus="menus">
          <template #prepend>
            <label>开始</label>
          </template>
        </AppMenus>
      </nav>

      <button class="toggle-btn" @click="toggleSlideMenus" title="">
        <IconIonChevronForward v-if="!menusStore.isSlideMenusShow" /><IconIonChevronBack v-else />
      </button>
    </template>
    <template v-else>
      <nav class="nav">
        <AppMenus :menus="menus" tree-mode />
      </nav>

      <div v-if="isTablet" class="backdrop" @click="toggleSlideMenus"></div>
    </template>
  </aside>
</template>

<style scoped>
.aside {
  position: sticky;
  top: var(--app-header-height);
  height: calc(100vh - var(--app-header-height) - 1px);
  z-index: 2;
  border-right: 1px solid var(--border-color);
  transition: margin-left 260ms ease-out;
  margin-left: calc(var(--aside-width) * -1);
  width: var(--aside-width);

  &.animated {
    transition: none;

    & > .backdrop {
      animation: none;
    }
  }

  &.show {
    margin-left: 0;

    &:hover > .toggle-btn {
      transform: translate(100%, -100%);
    }

    & > .toggle-btn {
      transform: translate(-100%, -100%);
    }

    & > .backdrop {
      display: block;
      animation: fadeIn 0.8s forwards;
    }
  }

  &.float {
    position: absolute;

    & > .nav {
      backdrop-filter: blur(2px);
    }
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

.toggle-btn {
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
  animation: fadeOut 0.8s forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    display: block;
    opacity: 1;
  }
  to {
    display: none;
    opacity: 0;
  }
}
</style>
