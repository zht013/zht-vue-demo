import { setLocale, supportedLocales, type MessageSchema, type SupportedLocale } from '@/i18n'

/**
 * 应用的国际化处理
 */
export function useAppI18n() {
  return {
    ...useI18n<[MessageSchema], SupportedLocale>(),
    supportedLocales: supportedLocales,
    setLocale,
  }
}
