import { createDiscreteApi, type NotificationApi, type NotificationOptions } from 'naive-ui'

class AppNotification {
  private _notification: NotificationApi
  private _defaultDuration = 4000

  constructor() {
    this._notification = createDiscreteApi(['notification']).notification
  }

  get notification() {
    return this._notification
  }

  info(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.info({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  error(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.error({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  success(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.success({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  warning(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.warning({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  destroyAll() {
    this._notification.destroyAll()
  }
}

const appNotification = new AppNotification()

export default appNotification
