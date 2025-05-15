import themeOverrides from './naive-overrides'

const appDarkThemeOverrides = structuredClone(themeOverrides)
appDarkThemeOverrides.common = {
  ...appDarkThemeOverrides.common,
  bgColor: 'rgba(29, 29, 29, .8)',
  bgColor1: 'rgb(29, 29, 29)',
  boxShadow4: '0 0 2px rgba(255, 255, 255, 0.3)',
  backdropColor: 'rgba(255, 255, 255, .1)',
}

export default appDarkThemeOverrides
