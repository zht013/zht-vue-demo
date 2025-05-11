<script setup lang="ts">
import { useAppI18n } from '@/composables/appI18n'
import { NButton, NIcon, NPopselect } from 'naive-ui'
import type { RouteLocationRaw } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { t, locale, supportedLocales, setLocale } = useAppI18n()
const options = supportedLocales.map((l) => ({
  label: l.name,
  value: l.code,
}))

const changeLocale = async () => {
  await setLocale(locale.value)

  router.replace({
    ...route,
    params: { ...route.params, locale: locale.value },
  } as RouteLocationRaw)
}
</script>

<template>
  <NPopselect :options="options" v-model:value="locale" @update:value="changeLocale">
    <NButton quaternary size="medium" :title="t('title.language')">
      <NIcon size="2rem">
        <IconIonLanguage />
      </NIcon>
    </NButton>
  </NPopselect>
</template>

<style scoped></style>
