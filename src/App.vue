<script setup lang="ts">
import {
  NConfigProvider,
  NGlobalStyle,
  type GlobalTheme,
  type NDateLocale,
  type NLocale,
} from 'naive-ui'
import appLightThemeOverrides from './theme/light'
import { useAppI18n } from './composables/appI18n'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import appNotification from './helpers/AppNotification'
import appDialog from './helpers/AppDialog'
import { useDebounceFn, useEventBus, useOnline, useWindowScroll, useWindowSize } from '@vueuse/core'
import { lightTheme } from 'naive-ui'
import { EventKeys } from './constants/keys'
import appDarkThemeOverrides from './theme/dark'
import { usePullToRefresh } from './composables/appPullToRefresh'
import appLoadingBar from './helpers/AppLoadingBar'

// PWA 相关
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

// 国际化相关
const { locale, supportedLocales } = useAppI18n()
const naiveLocale = computed<NLocale>(() => {
  return supportedLocales.find((item) => item.code === locale.value)!.naiveLocale
})
const naiveDateLocale = computed<NDateLocale>(() => {
  return supportedLocales.find((item) => item.code === locale.value)!.naiveDateLocale
})

// 滚动进度条
const { y: scrollTop } = useWindowScroll({
  behavior: 'smooth',
})
const { height: windowHeight } = useWindowSize()
const scrollPercentage = computed(() => {
  const docHeight = document.documentElement.scrollHeight
  const scrollRelHeight = docHeight - windowHeight.value

  return scrollTop.value / (scrollRelHeight ? scrollRelHeight : 1)
})

// 主题相关
const themeOverrides = shallowRef(appLightThemeOverrides)
const theme = shallowRef<GlobalTheme>(lightTheme)
useEventBus(EventKeys.themeChanged).on((value: GlobalTheme) => {
  theme.value = value

  if (theme.value.name === 'dark') {
    themeOverrides.value = appDarkThemeOverrides
  } else {
    themeOverrides.value = appLightThemeOverrides
  }
})

// 监听网络状态
const isOnline = useOnline()
watch(isOnline, () => {
  if (!isOnline.value) {
    appNotification.error('网络已断开...')
  } else {
    appNotification.success('网络已连接...')
  }
})

// 刷新视图
const isRefreshView = ref<boolean>(false)
const refreshViewDebounce = useDebounceFn(async () => {
  isRefreshView.value = true
  await nextTick()
  isRefreshView.value = false
}, 500)
const { distance, isPullEnd } = usePullToRefresh(() => {
  return refreshView()
})
useEventBus(EventKeys.refreshView).on(() => {
  refreshView()
})

async function refreshView() {
  appLoadingBar.start()
  await refreshViewDebounce()
  appLoadingBar.finish()
}

onMounted(() => {
  document.getElementById('app-spinner')?.remove()
})
</script>

<template>
  <NConfigProvider
    :locale="naiveLocale"
    :date-locale="naiveDateLocale"
    :theme-overrides="themeOverrides"
    :theme="theme"
  >
    <div
      class="scroll-progress"
      :style="{
        '--doc-scroll-percentage': scrollPercentage,
      }"
    ></div>

    <div
      class="pull-refresh"
      :class="{
        animate: isPullEnd,
      }"
      :style="{
        '--pull-distance': distance,
      }"
    >
      刷新...
    </div>

    <RouterView v-slot="{ Component }">
      <component :is="Component" :is-refresh-view="isRefreshView" />
    </RouterView>

    <NGlobalStyle />
  </NConfigProvider>
</template>

<style>
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.2rem;
  background: rgb(64, 152, 252);
  z-index: 10;
  transform: scale(var(--doc-scroll-percentage), 1);
  transform-origin: 0;
}

.pull-refresh {
  position: fixed;
  top: -2rem;
  left: 0;
  text-align: center;
  width: 100%;
  z-index: 100;
  opacity: 0.6;
  transform: translateY(calc(var(--pull-distance) * 1px));

  &.animate {
    transition: transform 200ms ease;
  }
}
</style>
