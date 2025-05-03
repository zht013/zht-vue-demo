import naiveApi from './NaiveApi'

class AppLoadingBar {
  get LoadingBar() {
    return naiveApi.LoadingBar
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
