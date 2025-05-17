import { ofetch } from 'ofetch'
import appMessage from './AppMessage'

interface GithubProxyErrorInfo {
  message: string
}

const githubFetch = ofetch.create({
  baseURL: import.meta.env.VITE_GITHUB_PROXY_BASE_URL,
  onRequest(ctx) {
    ctx.options.query = ctx.options.query || {}
    ctx.options.query.endpoint = ctx.request

    // 修改请求路径
    if (typeof ctx.request === 'string') {
      ctx.request = import.meta.env.VITE_GITHUB_PROXY_BASE_URL
    } else if (ctx.request instanceof URL) {
      ctx.request.pathname = import.meta.env.VITE_GITHUB_PROXY_BASE_URL
    }
  },
  onRequestError({ request, error }) {
    appMessage.error(`Request failure: ${error.message}, at ${request}`)
  },
  onResponseError({ response }) {
    appMessage.error((response._data as GithubProxyErrorInfo).message)
  },
})

export default githubFetch
