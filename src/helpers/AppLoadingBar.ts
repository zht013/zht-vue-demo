import { createDiscreteApi, type LoadingBarApi } from 'naive-ui'

class AppLoadingBar {
  private _loadingBar: LoadingBarApi

  constructor() {
    this._loadingBar = createDiscreteApi(['loadingBar']).loadingBar
  }

  get LoadingBar() {
    return this._loadingBar
  }

  /**
   * @description: 显示加载条
   */
  start() {
    this.LoadingBar.start()
  }

  /**
   * 隐藏加载条
   */
  finish() {
    this.LoadingBar.finish()
  }

  /**
   * @description: 显示错误类型加载条
   */
  error() {
    this.LoadingBar.error()
  }
}

const appLoadingBar = new AppLoadingBar()

export default appLoadingBar
