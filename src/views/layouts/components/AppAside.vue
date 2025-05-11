<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { type AppMenu } from '@/types'
import { useThemeVars } from 'naive-ui'
import AppMenus from './AppMenus.vue'
import { useAppBreakpoints } from '@/composables/appBreakpoints'
import { useEventListener, useToggle } from '@vueuse/core'

const { asideWidth } = defineProps<{
  asideWidth?: string
}>()
const themeVars = useThemeVars()
const { isDesktop, isTablet } = useAppBreakpoints()
const { menus: allMenus } = useMenuStore()
const { rootMenu, isSlideMenusShow } = storeToRefs(useMenuStore())
// 桌面使用根菜单的子菜单列表，其它使用全菜单
const menus = computed<AppMenu[]>(() => {
  return isDesktop.value ? (rootMenu.value?.children ?? []) : allMenus
})
// 不同的屏幕设置不同的宽度
const dynamicAsideWidth = computed(() => {
  if (isDesktop.value) {
    return asideWidth ?? themeVars.value.appAsideWidth
  } else if (isTablet.value) {
    return '36%'
  } else {
    return '100%'
  }
})

// 监听动画结束，添加 animated 以便在屏幕改变时不执行 transition
const aside = useTemplateRef('aside')
aside.value?.classList.add('animated')
useEventListener(aside, 'transitionend', () => {
  aside.value?.classList.add('animated')
})

// 当 slide menus 状态改变时，删除 animated 执行动画
watch(isSlideMenusShow, async () => {
  aside.value?.classList.remove('animated')
})

onBeforeRouteUpdate(() => {
  if (!isDesktop.value && isSlideMenusShow.value) {
    isSlideMenusShow.value = false
  }
})

// 切换导航栏的显示和隐藏
const toggleSlideMenus = useToggle(isSlideMenusShow)
</script>

<template>
  <aside
    ref="aside"
    class="aside-root"
    :class="{
      show: isSlideMenusShow,
      float: !isDesktop,
    }"
    :style="{
      '--border-color': themeVars.borderColor,
      '--divider-color': themeVars.dividerColor,
      '--hover-color': themeVars.hoverColor,
      '--aside-width': dynamicAsideWidth,
      '--backdrop-color': themeVars.backdropColor,
    }"
  >
    <template v-if="isDesktop">
      <nav class="nav hover-scrollbar">
        <AppMenus :menus="menus">
          <template #prepend>
            <label>{{ $t('label.start') }}</label>
          </template>
        </AppMenus>
      </nav>

      <button class="toggle-btn" @click="toggleSlideMenus()" title="">
        <IconIonChevronForward v-if="!isSlideMenusShow" /><IconIonChevronBack v-else />
      </button>
    </template>
    <template v-else>
      <nav class="nav">
        <AppMenus :menus="menus" tree-mode />
      </nav>

      <div v-if="isTablet" class="backdrop" @click="toggleSlideMenus()"></div>
    </template>
  </aside>
</template>

<style scoped>
.aside-root {
  height: calc(100vh - var(--app-header-height) - 1px);
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
    z-index: 4;

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
