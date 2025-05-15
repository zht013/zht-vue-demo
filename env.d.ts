/// <reference types="vite/client" />

declare const __APP_VERSION__: string
declare const __GIT_HASH__: string
declare const __BUILD_TIME__: string

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
  readonly VITE_APP_TITLE: string
  readonly VITE_BASE_API: string
  readonly VITE_GITHUB_URL: string
  readonly VITE_PRODUCTION_URL: string
  readonly VITE_DEFAULT_LOCALE: string
  readonly GITHUB_API_TOKEN: string
  readonly VITE_GITHUB_PROXY_BASE_URL: string
  readonly VITE_GITHUB_PROXY_SERVER: string
  readonly VITE_APP_API_BASE_URL: string
  readonly VITE_APP_API_SERVER: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
