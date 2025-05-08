import themeOverrides from './naive-overrides'

const appLightThemeOverrides = structuredClone(themeOverrides)
appLightThemeOverrides.common = {
  ...appLightThemeOverrides.common,
  bgColor: 'rgba(250, 250, 250, .8)',
  bgColor1: 'rgb(250, 250, 250)',
  boxShadow4: '1px 1px 4px rgba(110, 110, 110, 0.3)',
}

export default appLightThemeOverrides
