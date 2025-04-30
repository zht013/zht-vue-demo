import { createDiscreteApi, type DialogApi, type DialogOptions } from 'naive-ui'

class AppDialog {
  private _dialog: DialogApi

  constructor() {
    this._dialog = createDiscreteApi(['dialog']).dialog
  }

  get Dialog() {
    return this._dialog
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
