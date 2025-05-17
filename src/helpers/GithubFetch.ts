import { ofetch } from 'ofetch'
import appMessage from './AppMessage'

interface GithubProxyErrorInfo {
  message: string
}

const githubFetch = ofetch.create({
  baseURL: import.meta.env.VITE_GITHUB_PROXY_BASE_URL,
  onRequest({ request, options }) {
    options.query = options.query || {}
    options.query.endpoint = request

    request = import.meta.env.VITE_GITHUB_PROXY_BASE_URL
  },
  onRequestError({ request, error }) {
    appMessage.error(`Request failure: ${error.message}, at ${request}`)
  },
  onResponseError({ response }) {
    appMessage.error((response._data as GithubProxyErrorInfo).message)
  },
})

export default githubFetch
