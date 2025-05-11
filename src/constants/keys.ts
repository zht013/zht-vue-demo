import type { LayoutType } from '@/types'
import type { EventBusKey } from '@vueuse/core'
import type { GlobalTheme } from 'naive-ui'

export class EventKeys {
  static readonly layoutChanged: EventBusKey<LayoutType> = Symbol()
  static readonly themeChanged: EventBusKey<GlobalTheme> = Symbol()
  static readonly showSettings: EventBusKey<unknown> = Symbol()
  static readonly refreshView: EventBusKey<unknown> = Symbol()
}
