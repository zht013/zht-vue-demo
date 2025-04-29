import themeOverrides from './naive-overrides'

const appLightTheme = themeOverrides
appLightTheme.common = {
  ...appLightTheme.common,
  bgColor: '#f7f7f7',
  boxShadow4: '1px 1px 5px rgba(0, 0, 0, 0.3)',
}

export default appLightTheme
