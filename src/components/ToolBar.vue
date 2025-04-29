<script setup lang="ts">
import useAppI18n from '@/composables/useAppI18n'
import { NButton, NDrawer, NIcon, NDrawerContent } from 'naive-ui'

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
  <div class="toolbar">
    <nav class="navbar">
      <AppRouterLink to="/home">Home</AppRouterLink>
      <AppRouterLink to="/about">About</AppRouterLink>
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

      <NButton quaternary size="medium" @click="showSettings">
        <NIcon size="2.2rem" :title="t('title.settings')">
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
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: var(--n-bg-color);
  box-shadow: var(--n-box-shadow4);
}

.navbar {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.tools {
  display: flex;
  align-items: center;
}

.version-info {
  opacity: 0.4;
  flex: 1;
  text-align: center;
}
</style>
