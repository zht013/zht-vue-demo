import IconsResolver from 'unplugin-icons/resolver'
// import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { PublicPluginAPI } from 'unplugin-vue-components/types'
import Components from 'unplugin-vue-components/vite'
import { Plugin } from 'vite'

/**
 * 组件自动导入配置
 * @description 使用 unplugin-vue-components 插件来自动导入组件
 * @description 支持自动导入 Naive UI 组件
 * @description 支持自动导入自定义图标
 * @description 支持自动导入自定义组件
 * @description 支持自动导入自定义图标集
 * @returns
 */
export default function (): Plugin & {
  api: PublicPluginAPI
} {
  return Components({
    dirs: ['src/components'], // 自动扫描的组件目录
    extensions: ['vue'],
    dts: 'src/types/components.d.ts', // 生成类型声明文件
    resolvers: [
      // NaiveUiResolver(), // 自动导入 Naive UI 组件
      IconsResolver({
        prefix: 'icon', // 默认值，可修改
        customCollections: ['custom'], // 自定义图标集
        enabledCollections: ['ion'], // 安装的图标集
      }),
    ],
  })
}
