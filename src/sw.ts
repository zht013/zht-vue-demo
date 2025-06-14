/// <reference lib="webworker" />
import {
  cleanupOutdatedCaches,
  createHandlerBoundToURL,
  precacheAndRoute,
} from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

declare let self: ServiceWorkerGlobalScope

const isDev = import.meta.env.DEV

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    // 这里的 skipWaiting() 是 Workbox 提供的一个函数，用于跳过等待状态
    // 这意味着在 Service Worker 安装后，会立即激活新的 Service Worker
    // 而不是等到所有的页面都关闭后才激活新的 Service Worker
    // 这通常用于在开发模式下，或者在需要立即更新 Service Worker 时使用
    self.skipWaiting()
    // 这里的 clientsClaim() 是 Workbox 提供的一个函数，用于在 Service Worker 激活时立即控制所有客户端
    // 这意味着在 Service Worker 激活后，所有的页面都会立即使用新的 Service Worker
    // 而不是等到页面刷新后才使用新的 Service Worker
    // 这通常用于在开发模式下，或者在需要立即更新 Service Worker 时使用
    clientsClaim()
  }
})

// 这里的 cleanupOutdatedCaches() 是 Workbox 提供的一个函数，用于清除过期的缓存
// 这通常在 Service Worker 更新时使用，以确保用户获取到最新的资源
// 这行代码会在 Service Worker 激活时自动执行
cleanupOutdatedCaches()

// 这里的 precacheAndRoute() 是 Workbox 提供的一个函数，用于预缓存资源并注册路由
// self.__WB_MANIFEST 是 Workbox 在构建时自动生成的一个变量
// 其中包含了需要预缓存的资源列表
// 这些资源会在 Service Worker 安装时被缓存
// 预缓存文件（由 Vite 插件自动注入）
precacheAndRoute(self.__WB_MANIFEST)

let allowlist: RegExp[] | undefined
// 在开发模式下，allowlist 只允许根路径
// 这意味着在开发模式下，只有根路径的请求会被 Service Worker 处理
// 其他路径的请求将不会被 Service Worker 缓存
// 这通常用于调试和开发阶段，以避免 Service Worker 干扰开发过程
if (isDev) {
  allowlist = [/^\/$/]
}

// 这里的 createHandlerBoundToURL() 是 Workbox 提供的一个函数，用于创建一个处理程序
// 该处理程序会将请求重定向到指定的 URL
// 这里的 'index.html' 是应用的入口文件
// 这行代码会将所有的导航请求（例如点击链接）重定向到 'index.html'
// 这通常用于单页面应用程序（SPA），以确保所有的导航请求都由前端路由处理
// 这行代码会在 Service Worker 激活时自动执行
// 这里的 registerRoute() 是 Workbox 提供的一个函数，用于注册一个路由
// 该路由会将所有的导航请求（例如点击链接）重定向到指定的 URL
// 允许离线工作
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }))

// 缓存 Google Fonts css 和 字体
registerRoute(
  ({ url }) => /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/.test(url.href),
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 30,
        maxAgeSeconds: 60 * 60 * 24 * 365 * 2, //2年
      }),
    ],
  }),
)

// if (!isDev) {
// 缓存静态资源（CSS、JS），使用 Stale While Revalidate 策略
registerRoute(
  ({ request }) => ['style', 'script', 'worker'].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 天
      }),
    ],
  }),
)

// 动态缓存图片，使用 CacheFirst 策略
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 天
      }),
    ],
  }),
)

// 动态缓存 API 请求，使用 NetworkFirst 策略
registerRoute(
  ({ url }) => {
    // 取出环境变量的 pathname 部分
    const githubProxyPath = (() => {
      try {
        return new URL(import.meta.env.VITE_GITHUB_PROXY_BASE_URL).pathname
      } catch {
        return import.meta.env.VITE_GITHUB_PROXY_BASE_URL
      }
    })()
    const appApiPath = (() => {
      try {
        return new URL(import.meta.env.VITE_APP_API_BASE_URL).pathname
      } catch {
        return import.meta.env.VITE_APP_API_BASE_URL
      }
    })()

    return url.pathname.startsWith(githubProxyPath) || url.pathname.startsWith(appApiPath)
  },
  new NetworkFirst({
    cacheName: 'api-cache',
    networkTimeoutSeconds: 10,
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }), // 缓存状态码200的响应
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 天
      }),
    ],
  }),
  'GET',
)
// }

if (isDev) {
  self.skipWaiting()
  clientsClaim()
}
