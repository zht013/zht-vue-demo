<script setup lang="ts">
import { useAppI18n } from '@/composables/appI18n'
import type { AppToolbarMode } from '@/types'
import { NButton, NIcon, NPopover } from 'naive-ui'

defineEmits<{
  showSettings: []
}>()

const { mode = 'inline' } = defineProps<{
  /** 显示方式 */
  mode?: AppToolbarMode
}>()

const { t } = useAppI18n()
const githubUrl = import.meta.env.VITE_GITHUB_URL
const productionUrl = import.meta.env.VITE_PRODUCTION_URL
const isDev = import.meta.env.DEV
</script>
<template>
  <LanguageSelector />

  <template v-if="mode === 'inline'">
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

    <NButton quaternary size="medium" :title="t('title.settings')" @click="$emit('showSettings')">
      <NIcon size="2.2rem">
        <IconIonSettingsOutline />
      </NIcon>
    </NButton>

    <NButton quaternary size="medium" :title="t('title.login')">
      <NIcon size="2.4rem">
        <IconIonLogInOutline />
      </NIcon>
    </NButton>
  </template>
  <template v-else>
    <NPopover :show-arrow="false" trigger="click">
      <template #trigger>
        <NButton quaternary size="medium">
          <NIcon size="2.4rem">
            <IconIonEllipsisHorizontal />
          </NIcon>
        </NButton>
      </template>

      <div class="btn-list">
        <NButton
          tag="a"
          :href="githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          quaternary
          size="medium"
          title="GitHub"
          style="justify-content: flex-start"
        >
          <template #icon>
            <NIcon size="2.2rem">
              <IconIonLogoGithub />
            </NIcon>
          </template>

          GitHub
        </NButton>

        <NButton
          v-if="isDev"
          tag="a"
          :href="productionUrl"
          target="_blank"
          rel="noopener noreferrer"
          quaternary
          size="medium"
          style="justify-content: flex-start"
        >
          <template #icon>
            <NIcon size="2.2rem"> <IconIonEarthOutline /> </NIcon>
          </template>

          Production
        </NButton>

        <NButton
          quaternary
          size="medium"
          @click="$emit('showSettings')"
          style="justify-content: flex-start"
        >
          <template #icon>
            <NIcon size="2.2rem">
              <IconIonSettingsOutline />
            </NIcon>
          </template>

          {{ t('title.settings') }}
        </NButton>

        <NButton quaternary size="medium" style="justify-content: flex-start">
          <template #icon>
            <NIcon size="2.4rem">
              <IconIonLogInOutline />
            </NIcon>
          </template>

          {{ t('title.login') }}
        </NButton>
      </div>
    </NPopover>
  </template>
</template>

<style scoped>
.btn-list {
  display: flex;
  flex-flow: column;
  align-items: stretch;
  min-width: 16rem;
  gap: 0.6rem;
}
</style>
