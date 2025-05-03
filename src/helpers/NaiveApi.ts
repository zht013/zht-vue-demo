import {
  createDiscreteApi,
  type DialogApi,
  type LoadingBarApi,
  type MessageApi,
  type NotificationApi,
} from 'naive-ui'

class NaiveApi {
  private _loadingBar: LoadingBarApi
  private _dialog: DialogApi
  private _message: MessageApi
  private _notification: NotificationApi

  constructor() {
    const api = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'])
    this._loadingBar = api.loadingBar
    this._dialog = api.dialog
    this._message = api.message
    this._notification = api.notification
  }

  get LoadingBar() {
    return this._loadingBar
  }

  get Dialog() {
    return this._dialog
  }

  get Message() {
    return this._message
  }

  get Notification() {
    return this._notification
  }
}

const naiveApi = new NaiveApi()

export default naiveApi
