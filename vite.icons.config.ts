import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

/**
 * 图标配置
 * @description 使用 unplugin-icons 插件来自动加载 SVG 图标
 * @description 支持自定义图标目录
 * @returns
 */
export default function () {
  return Icons({
    autoInstall: true,
    compiler: 'vue3',
    customCollections: {
      custom: FileSystemIconLoader(
        './src/assets/icons', // 存放自定义 SVG 的目录
      ),
    },
  })
}
