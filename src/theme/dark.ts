import themeOverrides from './naive-overrides'

const appDarkTheme = themeOverrides
appDarkTheme.common = {
  ...appDarkTheme.common,
  bgColor: '#292929',
  boxShadow4: '1px 1px 0 rgba(255, 255, 255, 0.3)',
}

export default appDarkTheme
