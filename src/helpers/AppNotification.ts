import { type NotificationOptions } from 'naive-ui'
import naiveApi from './NaiveApi'

class AppNotification {
  private _defaultDuration = 4000

  get Notification() {
    return naiveApi.Notification
  }

  info(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this.Notification.info({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  error(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this.Notification.error({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  success(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this.Notification.success({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  warning(content: string, options?: Omit<NotificationOptions, 'type'>) {
    this.Notification.warning({
      content,
      keepAliveOnHover: true,
      duration: this._defaultDuration,
      ...options,
    })
  }

  destroyAll() {
    this.Notification.destroyAll()
  }
}

const appNotification = new AppNotification()

export default appNotification
