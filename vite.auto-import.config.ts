import AutoImport from 'unplugin-auto-import/vite'

/**
 * 自动导入配置
 * @description 自动导入 Vue 相关 API
 * @description 自动导入 Vue Router 相关 API
 * @description 自动导入 Pinia 相关 API
 * @returns
 */
export default function () {
  return AutoImport({
    imports: [
      'vue',
      'vue-router',
      'pinia',
      'vue-i18n',
      {
        'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
      },
    ],
    dts: 'src/types/auto-imports.d.ts', // 生成类型声明文件
  })
}
