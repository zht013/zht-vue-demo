import themeOverrides from './naive-overrides'

const appLightThemeOverrides = structuredClone(themeOverrides)
appLightThemeOverrides.common = {
  ...appLightThemeOverrides.common,
  bgColor: 'rgba(250, 250, 250, .8)',
  bgColor1: 'rgb(250, 250, 250)',
  boxShadow4: '0 0 3px rgba(110, 110, 110, 0.3)',
  backdropColor: 'rgba(0, 0, 0, .2)',
}

export default appLightThemeOverrides
