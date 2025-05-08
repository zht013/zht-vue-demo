import themeOverrides from './naive-overrides'

const appDarkThemeOverrides = structuredClone(themeOverrides)
appDarkThemeOverrides.common = {
  ...appDarkThemeOverrides.common,
  bgColor: 'rgba(29, 29, 29, .8)',
  bgColor1: 'rgb(29, 29, 29)',
  boxShadow4: '1px 1px 0 rgba(255, 255, 255, 0.3)',
}

export default appDarkThemeOverrides
