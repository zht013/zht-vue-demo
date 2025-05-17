import { ofetch } from 'ofetch'
import appMessage from './AppMessage'
import { trimStart } from '@/utils/string'

interface GithubProxyErrorInfo {
  message: string
}

const githubBaseUrl = import.meta.env.VITE_GITHUB_PROXY_BASE_URL
const githubFetch = ofetch.create({
  baseURL: githubBaseUrl,
  retry: 0,
  onRequest(ctx) {
    ctx.options.query = ctx.options.query || {}

    // 修改请求路径
    if (typeof ctx.request === 'string') {
      const url = new URL(ctx.request, 'http://dummy')
      ctx.options.query = Object.keys(ctx.options.query).length
        ? ctx.options.query
        : Object.fromEntries(url.searchParams.entries())

      if (!ctx.options.query.endpoint) {
        ctx.options.query.endpoint = trimStart(url.pathname, '/')
      }
      ctx.request = githubBaseUrl
    } else if (ctx.request instanceof URL) {
      ctx.options.query = Object.keys(ctx.options.query).length
        ? ctx.options.query
        : Object.fromEntries(ctx.request.searchParams.entries())

      if (!ctx.options.query.endpoint) {
        ctx.options.query.endpoint = trimStart(ctx.request.pathname, '/')
      }
      ctx.request.pathname = githubBaseUrl
    }
  },
  onRequestError({ request, error }) {
    appMessage.error(`Request failure: ${error.message}, at ${request}`)
  },
  onResponseError({ response }) {
    if (response._data) {
      appMessage.error((response._data as GithubProxyErrorInfo).message)
    } else {
      appMessage.error(`${response.status} at ${response.url}`)
    }
  },
})

export default githubFetch
