<script setup lang="ts">
import { useMenuStore } from '@/stores/menu'
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const menuStore = useMenuStore()
const menus = computed(() => {
  return menuStore.rootMenu?.children ?? []
})
</script>

<template>
  <aside
    :style="{
      '--divider-color': themeVars.dividerColor,
      '--hover-color': themeVars.hoverColor,
    }"
  >
    <ul class="menu-list hover-scrollbar">
      <li v-for="menu in menus" :key="menu.key">
        <label v-if="menu.isGroup">
          {{ typeof menu.label === 'function' ? menu.label() : menu.label }}
        </label>
        <RouterLink
          v-else
          :to="{
            name: menu.routeName,
          }"
        >
          {{ typeof menu.label === 'function' ? menu.label() : menu.label }}
        </RouterLink>

        <ul v-if="menu.children?.length">
          <li v-for="subMenu in menu.children" :key="subMenu.key">
            <RouterLink
              :to="{
                name: subMenu.routeName,
              }"
            >
              {{ typeof subMenu.label === 'function' ? subMenu.label() : subMenu.label }}
            </RouterLink>
          </li>
        </ul>

        <hr />
      </li>
    </ul>
  </aside>
</template>

<style scoped>
ul {
  list-style: none;
}

.menu-list {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0.4rem;
}

label {
  display: block;
  font-weight: 600;
  padding: 0.6rem 1rem 0 1.6rem;
}

a {
  display: block;
  padding: 0.6rem 1.6rem;
  border-radius: 0.4rem;

  &:hover {
    background-color: var(--hover-color);
  }
}

hr {
  border: 1px solid var(--divider-color);
  margin: 1rem 0;
}
</style>
