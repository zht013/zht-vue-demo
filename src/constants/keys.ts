import type { LayoutType } from '@/types'
import type { EventBusKey } from '@vueuse/core'
import type { GlobalTheme } from 'naive-ui'

export class EventKeys {
  static readonly layoutChanged: EventBusKey<LayoutType> = Symbol()
  static readonly themeChanged: EventBusKey<GlobalTheme> = Symbol()
  static readonly refreshView: EventBusKey<unknown> = Symbol()
  static readonly toggleAside: EventBusKey<boolean> = Symbol()
}

export class LocalstorageKeys {
  static readonly routeHistory = 'route-history-enabled'
  static readonly pullToRefresh = 'pull-to-refresh'
}
