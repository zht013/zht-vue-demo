<script setup lang="ts">
import useAppI18n from '@/composables/useAppI18n'
import { useNavStore } from '@/stores/nav'
import type { AppMenu } from '@/types'
import { NButton, NDrawer, NIcon, NDrawerContent, type MenuOption, NMenu } from 'naive-ui'
import { RouterLink } from 'vue-router'

const { menus = [] } = defineProps<{
  menus?: AppMenu[]
}>()
const { currentMenu } = useNavStore()
const menuOptions = menus.map<MenuOption>(
  (m) =>
    ({
      key: m.id,
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: m.routeName,
            },
          },
          {
            default: () => m.name(),
          },
        ),
    }) as MenuOption,
)

const { t } = useAppI18n()
const githubUrl = import.meta.env.VITE_GITHUB_URL
const productionUrl = import.meta.env.VITE_PRODUCTION_URL
const isDev = import.meta.env.DEV
const settingsShow = ref(false)

function showSettings() {
  settingsShow.value = !settingsShow.value
}
</script>

<template>
  <div class="header">
    <NIcon size="2.2rem">
      <IconCustomLogo />
    </NIcon>
    <nav class="navbar">
      <NMenu :options="menuOptions" mode="horizontal" :default-value="currentMenu?.id" />
    </nav>

    <div class="tools">
      <LanguageSelector />

      <NButton
        tag="a"
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        quaternary
        size="medium"
        title="GitHub"
      >
        <NIcon size="2.2rem">
          <IconIonLogoGithub />
        </NIcon>
      </NButton>

      <NButton
        v-if="isDev"
        tag="a"
        :href="productionUrl"
        target="_blank"
        rel="noopener noreferrer"
        quaternary
        size="medium"
        title="Production"
      >
        <NIcon size="2.2rem">
          <IconIonEarthOutline />
        </NIcon>
      </NButton>

      <NButton quaternary size="medium" :title="t('title.settings')" @click="showSettings">
        <NIcon size="2.2rem">
          <IconIonSettingsOutline />
        </NIcon>
      </NButton>

      <NDrawer v-model:show="settingsShow" default-width="35%" placement="right">
        <NDrawerContent closable :title="t('title.settings')">
          <AppSettings />

          <template #footer>
            <VersionInfo class="version-info" />
          </template>
        </NDrawerContent>
      </NDrawer>

      <NButton quaternary size="medium" :title="t('title.login')">
        <NIcon size="2.4rem">
          <IconIonLogInOutline />
        </NIcon>
      </NButton>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  box-shadow: var(--app-box-shadow4);
  backdrop-filter: blur(2px);
  background-image: radial-gradient(transparent 0.1rem, var(--app-bg-color) 0.1rem);
  background-size: 0.4rem 0.4rem;
}

.navbar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.tools {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.version-info {
  opacity: 0.4;
  flex: 1;
  text-align: center;
}
</style>
