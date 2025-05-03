import { type DialogOptions } from 'naive-ui'
import naiveApi from './NaiveApi'

class AppDialog {
  get Dialog() {
    return naiveApi.Dialog
  }

  warning(content: string, options?: DialogOptions) {
    this.Dialog.warning({
      content,
      closable: true,
      showIcon: true,
      maskClosable: true,
      ...options,
    })
  }

  error(content: string, options?: DialogOptions) {
    this.Dialog.error({
      content,
      closable: true,
      showIcon: true,
      maskClosable: true,
      ...options,
    })
  }

  info(content: string, options?: DialogOptions) {
    this.Dialog.info({
      content,
      closable: true,
      showIcon: true,
      maskClosable: true,
      ...options,
    })
  }

  success(content: string, options?: DialogOptions) {
    this.Dialog.success({
      content,
      closable: true,
      showIcon: true,
      maskClosable: true,
      ...options,
    })
  }
}

const appDialog = new AppDialog()

export default appDialog
