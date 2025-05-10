<script setup lang="ts">
import { useAppI18n } from '@/composables/appI18n'
import { RouteName } from '@/router/constants'
import type { AppMenu } from '@/types'

const { menus = [] } = defineProps<{
  /** 菜单列表 */
  menus?: AppMenu[]
  treeMode?: boolean
}>()
const { t } = useAppI18n()
</script>

<template>
  <ul
    :class="{
      'tree-mode': treeMode,
    }"
  >
    <li v-if="$slots.prepend">
      <slot name="prepend" />
    </li>
    <li v-for="menu in menus" :key="menu.key">
      <label v-if="menu.isGroup">
        {{
          typeof menu.label === 'function'
            ? treeMode && menu.routeName === RouteName.VUE3.ROOT
              ? t('nav.vue3.start')
              : menu.label()
            : menu.label
        }}
      </label>
      <RouterLink
        v-else
        :to="{
          name: menu.routeName,
        }"
      >
        {{ typeof menu.label === 'function' ? menu.label() : menu.label }}
      </RouterLink>

      <template v-if="menu.children?.length">
        <AppMenus :menus="menu.children" />
      </template>
    </li>
  </ul>
</template>

<style scoped>
ul {
  list-style: none;

  & > li > ul > li ul {
    padding-left: 1.2rem;
  }

  &.tree-mode li > ul {
    padding-left: 1.2rem;
  }
}

label,
:slotted(label) {
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
</style>
