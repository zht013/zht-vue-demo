import { setLocale, supportedLocales, type MessageSchema, type SupportedLocale } from '@/i18n'

const useAppI18n = () => {
  return {
    ...useI18n<[MessageSchema], SupportedLocale>(),
    supportedLocales: supportedLocales,
    setLocale,
  }
}

export default useAppI18n
