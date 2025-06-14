import { LocalstorageKeys } from '@/constants/keys'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app-store', () => {
  const routeHistoryEnabled = useStorage(LocalstorageKeys.routeHistory, true)
  const pullToRefreshEnabled = useStorage(LocalstorageKeys.pullToRefresh, true)

  return {
    routeHistoryEnabled,
    pullToRefreshEnabled,
  }
})
