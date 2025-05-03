import themeOverrides from './naive-overrides'

const appLightTheme = themeOverrides
appLightTheme.common = {
  ...appLightTheme.common,
  bgColor: 'rgba(247, 247, 247, .6)',
  boxShadow4: '1px 1px 4px rgba(110, 110, 110, 0.3)',
}

export default appLightTheme
