import type { UserConfig } from '@commitlint/types'
import { RuleConfigSeverity } from '@commitlint/types'

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  // parserPreset: 'conventional-changelog-atom',
  // formatter: '@commitlint/format',
  rules: {
    'type-enum': [
      RuleConfigSeverity.Error,
      'always',
      [
        'feat', // 新特性、新功能
        'fix', // 修改bug
        'docs', // 文档修改
        'style', // 代码格式修改, 注意不是 css 修改
        'refactor', // 代码重构
        'perf', // 优化相关，比如提升性能、体验
        'test', // 测试用例修改
        'chore', // 其他修改, 比如改变构建流程、或者增加依赖库、工具等
        'revert', // 回滚到上一个版本
        'build', // 编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'ci', // 持续集成修改
        'wip', // 开发中
        'merge', // 合并分支
        'config', // 配置文件修改
        'release', // 发布版本
        'security', // 安全相关
        'workflow', // 工作流相关
        'types', // 类型定义文件修改
        'translation', // 国际化相关
        'rename', // 重命名
        'deprecate', // 弃用
        'upgrade', // 升级
        'downgrade', // 降级
        'hotfix', // 紧急修复
        'build(deps)', // 依赖更新
        'build(deps-dev)', // 开发依赖更新
        'init', // 初始化
      ],
    ],
  },
}

export default Configuration
