import { createDiscreteApi, type NotificationApi, type NotificationOptions } from 'naive-ui'

class AppNotification {
  private _notification: NotificationApi

  constructor() {
    this._notification = createDiscreteApi(['notification']).notification
  }

  get notification() {
    return this._notification
  }

  info(title: string, content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.info({
      title,
      content,
      duration: 5,
      ...options,
    })
  }

  error(title: string, content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.error({
      title,
      content,
      duration: 5,
      ...options,
    })
  }

  success(title: string, content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.success({
      title,
      content,
      duration: 5,
      ...options,
    })
  }

  warning(title: string, content: string, options?: Omit<NotificationOptions, 'type'>) {
    this._notification.warning({
      title,
      content,
      duration: 5,
      ...options,
    })
  }

  destroyAll() {
    this._notification.destroyAll()
  }
}

const appNotification = new AppNotification()

export default appNotification
