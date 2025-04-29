<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, type NDateLocale, type NLocale } from 'naive-ui'
import appLightTheme from './theme/light'
import useAppI18n from './composables/useAppI18n'

const { locale, supportedLocales } = useAppI18n()
const naiveLocale = computed<NLocale>(() => {
  return supportedLocales.find((item) => item.code === locale.value)!.naiveLocale
})
const naiveDateLocale = computed<NDateLocale>(() => {
  return supportedLocales.find((item) => item.code === locale.value)!.naiveDateLocale
})
</script>

<template>
  <NConfigProvider
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    :theme-overrides="appLightTheme"
  >
    <RouterView />

    <NGlobalStyle />
  </NConfigProvider>
</template>
