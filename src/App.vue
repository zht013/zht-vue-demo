<script setup lang="ts">
import { NConfigProvider, NGlobalStyle, type NDateLocale, type NLocale } from 'naive-ui'
import appLightTheme from './theme/light'
import useAppI18n from './composables/useAppI18n'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import appNotification from './helpers/AppNotification'
import appDialog from './helpers/AppDialog'

const { updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swScriptUrl: string) {
    console.info('Service Worker 已注册', swScriptUrl)
  },
  onOfflineReady() {
    appNotification.info('应用已准备好离线使用')
  },
  onNeedRefresh() {
    appDialog.info('有新的内容可用，是否重新加载？', {
      showIcon: false,
      closable: false,
      positiveText: '重新加载',
      negativeText: '稍后再说',
      onPositiveClick: () => {
        updateServiceWorker(true)
      },
    })
  },
})

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
