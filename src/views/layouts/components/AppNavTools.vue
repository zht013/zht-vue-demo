<script setup lang="ts">
import { useAppI18n } from '@/composables/appI18n'
import { EventKeys } from '@/constants/keys'
import { useEventBus } from '@vueuse/core'
import { NButton, NIcon } from 'naive-ui'

const { t } = useAppI18n()
const githubUrl = import.meta.env.VITE_GITHUB_URL
const productionUrl = import.meta.env.VITE_PRODUCTION_URL
const isDev = import.meta.env.DEV
const eventBus = useEventBus(EventKeys.showSettings)

function showSettings() {
  eventBus.emit()
}
</script>
<template>
  <div>
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

    <NButton quaternary size="medium" :title="t('title.login')">
      <NIcon size="2.4rem">
        <IconIonLogInOutline />
      </NIcon>
    </NButton>
  </div>
</template>

<style scoped></style>
