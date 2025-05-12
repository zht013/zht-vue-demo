import {
  createDiscreteApi,
  type DialogApi,
  type LoadingBarApi,
  type MessageApi,
  type MessageProviderProps,
  type NotificationApi,
  type NotificationProviderProps,
} from 'naive-ui'

class NaiveApi {
  private _loadingBar: LoadingBarApi
  private _dialog: DialogApi
  private _message: MessageApi
  private _notification: NotificationApi
  private _notificationProviderProps: NotificationProviderProps = {}
  private _messageProviderProps: MessageProviderProps = {}

  constructor() {
    const api = createDiscreteApi(['message', 'dialog', 'notification', 'loadingBar'], {
      notificationProviderProps: this._notificationProviderProps,
      messageProviderProps: this._messageProviderProps,
    })
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

  get MessageProviderProps() {
    return this._messageProviderProps
  }

  get Notification() {
    return this._notification
  }

  get NotificationProviderProps() {
    return this._notificationProviderProps
  }
}

const naiveApi = new NaiveApi()

export default naiveApi
