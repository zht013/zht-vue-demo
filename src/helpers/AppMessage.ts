import { type MessageOptions } from 'naive-ui'
import type { VNodeChild } from 'vue'
import naiveApi from './NaiveApi'

type ContentType = string | (() => VNodeChild)

class AppMessage {
  get Message() {
    return naiveApi.Message
  }

  info(content: ContentType, options?: MessageOptions) {
    this.Message.info(content, options)
  }

  error(content: ContentType, options?: MessageOptions) {
    this.Message.error(content, options)
  }

  success(content: ContentType, options?: MessageOptions) {
    this.Message.success(content, options)
  }

  warning(content: ContentType, options?: MessageOptions) {
    this.Message.warning(content, options)
  }

  loading(content: ContentType, options?: MessageOptions) {
    this.Message.loading(content, options)
  }

  destroyAll() {
    this.Message.destroyAll()
  }
}

const appMessage = new AppMessage()

export default appMessage
