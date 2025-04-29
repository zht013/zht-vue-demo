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
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
