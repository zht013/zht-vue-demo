import { Plugin } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// /**
//  * 生成文件的 MD5 哈希值
//  * @description 用于生成 index.html 的 revision
//  * @description 该值会在 Service Worker 中使用，用于缓存文件
//  * @description 当文件内容发生变化时，Service Worker 会重新加载
//  * @param filePath 文件路径
//  * @returns 文件的 MD5 哈希值
//  */
// function generateRevision(filePath: string): string {
//   const fileContent = fs.readFileSync(filePath, 'utf-8')
//   return crypto.createHash('md5').update(fileContent).digest('hex')
// }

/**
 * PWA 配置
 * @description 使用 vite-plugin-pwa 插件来自动生成 PWA 相关文件
 * @description 支持自定义 Service Worker
 * @description 支持自定义 Manifest 文件
 * @description 支持自定义图标
 * @param isDev 是否是开发环境
 * @returns
 */
export default function (isDev: boolean): Plugin[] {
  return VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
    registerType: isDev ? 'autoUpdate' : 'prompt',
    injectRegister: false,
    // selfDestroying: true,
    pwaAssets: {
      // disabled: false, // default: false
      config: true,
    },
    manifest: {
      name: `zht-vue-demo${isDev ? '-dev' : ''}`,
      short_name: 'zht-vue',
      description: 'zht-vue project learning',
      theme_color: '#ffffff',
    },
    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      // additionalManifestEntries: [
      //   {
      //     url: '/index.html',
      //     // 添加以下配置处理 index.html 的 revision
      //     revision: generateRevision('./index.html'),
      //   },
      // ],
    },
    devOptions: {
      enabled: isDev,
      // 如果你在自定义 service worker 中使用了 registerRoute
      // 那么在开发选项中添加 navigateFallback
      // vite-plugin-pwa 插件将会将其包含在注入点（self.__WB_MANIFEST）中
      navigateFallback: 'index.html',
      // 如果您在自定义 service worker 中使用了 import 语句而不是 importScripts
      // 则必须在开发选项中配置type: 'module'。
      type: 'module',
    },
  })
}
