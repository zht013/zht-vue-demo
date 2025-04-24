import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import browserslist from 'browserslist'
import { browserslistToTargets } from 'lightningcss'
import AutoImport from './vite.auto-import.config'
import Components from './vite.vue-components.config'
import Icons from './vite.icons.config'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import VitePWA from './vite.pwa.config'
import { version } from './package.json'
import { execSync } from 'child_process'

// 获取git最新提交hash
const gitHash = execSync('git rev-parse --short HEAD').toString().trim()

// https://vite.dev/config/
export default defineConfig(
  // ({ command, mode, isSsrBuild, isPreview })
  ({ mode }) => {
    // 根据当前工作目录中的 `mode` 加载 .env 文件
    // 设置第三个参数为 '' 来加载所有环境变量，而不管是否有
    // `VITE_` 前缀。
    const env = loadEnv(mode, process.cwd()) as unknown as ImportMetaEnv
    const isDev = mode === 'development'

    return {
      base: env.VITE_BASE_URL,
      server: {
        port: 8001,
      },
      define: {
        __APP_VERSION__: JSON.stringify(version),
        __GIT_HASH__: JSON.stringify(gitHash),
        __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
      },
      plugins: [
        vue(),
        vueDevTools(),
        VueI18nPlugin({
          include: [path.resolve(__dirname, 'src/i18n/locales/**')], // 指定 i18n 资源文件的路径
        }),
        AutoImport(),
        Components(),
        Icons(),
        VitePWA(isDev),
      ],
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
      },
      css: {
        transformer: 'lightningcss',
        lightningcss: {
          targets: browserslistToTargets(browserslist('>= 0.25%')),
        },
      },
      build: {
        cssMinify: 'lightningcss',
      },
    }
  },
)
