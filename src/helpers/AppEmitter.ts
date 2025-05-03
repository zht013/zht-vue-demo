import type { LayoutType } from '@/types'
import mitt, { type Emitter } from 'mitt'

export const EventKeys = {
  LAYOUT_CHANGED: Symbol(),
}

type Events = {
  [EventKeys.LAYOUT_CHANGED]: LayoutType
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
