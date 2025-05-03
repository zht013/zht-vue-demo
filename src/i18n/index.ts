import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN.json'
import {
  zhCN as naiveZhCN,
  enUS as naiveEnUS,
  dateZhCN as naiveDateZhCN,
  dateEnUS as naiveDateEnUS,
} from 'naive-ui'

export const supportedLocales = [
  {
    name: '简体中文',
    code: 'zh-CN',
    naiveLocale: naiveZhCN,
    naiveDateLocale: naiveDateZhCN,
  },
  {
    name: 'English',
    code: 'en-US',
    naiveLocale: naiveEnUS,
    naiveDateLocale: naiveDateEnUS,
  },
] as const

export type SupportedLocale = (typeof supportedLocales)[number]['code']
export type MessageSchema = typeof zhCN
export const defaultLocale = import.meta.env.VITE_DEFAULT_LOCALE // 默认语言
// createI18n<{ message: MessageSchema }, SupportedLocale>
const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  // globalInjection: true, // 全局注入 $t, $tc, $d, $n
  // locale: isLocaleSupported(navigator.language as SupportedLocale)
  //   ? navigator.language
  //   : defaultLocale, // 如果浏览器语言不在支持的语言列表中，则使用默认语言
  fallbackLocale: defaultLocale, // 回退语言
  messages: {},
  // messages: { 'zh-CN': zhCN } as Record<SupportedLocale, MessageSchema>, // 语言包
  silentTranslationWarn: true, // 禁用翻译警告
  missingWarn: false, // 禁用缺少翻译警告
  silentFallbackWarn: true, // 禁用回退语言警告
  fallbackWarn: false, // 禁用回退语言警告
})

/**
 * 动态加载语言文件
 * @param locale 语言
 * @returns {Promise<void>}
 */
export async function loadLocaleMessages(locale: SupportedLocale): Promise<void> {
  // 动态加载 locale messages
  const messages = await import(`./locales/${locale}.json`)
  // 设置 locale and locale message
  i18n.global.setLocaleMessage(locale, messages.default)

  return nextTick()
}

/**
 * 检查是否支持的语言
 * @param locale 语言
 * @returns {boolean}
 */
export function isLocaleSupported(locale: SupportedLocale): boolean {
  return supportedLocales.some((l) => l.code === locale)
}

/**
 * 设置语言
 * @param locale 目标语言
 */
export async function setLocale(locale: SupportedLocale) {
  // 检查是否已加载该语言的消息, 如果没有，则加载
  if (!i18n.global.availableLocales.includes(locale)) {
    await loadLocaleMessages(locale)
  }

  if (i18n.global.locale.value !== locale) {
    i18n.global.locale.value = locale

    // /**
    //  * NOTE:
    //  * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
    //  * The following is an example for axios.
    //  *
    //  * axios.defaults.headers.common['Accept-Language'] = locale
    //  */
    // document.querySelector('html')?.setAttribute('lang', locale)
  }
}

export default i18n
