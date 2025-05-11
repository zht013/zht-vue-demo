export enum RouteIndex {
  appHome,
  echarts,
  d3,
  three,
  dvProject,
}

export const RouteName = {
  VUE3: {
    ROOT: Symbol(),
    INTRODUCE: Symbol(),
    ANIMATION: {
      PARALLAX: Symbol(),
    },
  },
  ECHARTS: {
    ROOT: Symbol(),
    DASHBOARD: Symbol(),
  },
  D3: {
    ROOT: Symbol(),
    DASHBOARD: Symbol(),
  },
  THREE: {
    ROOT: Symbol(),
    DASHBOARD: Symbol(),
  },
  DV_PROJECT: {
    HOME: Symbol(),
  },
}
