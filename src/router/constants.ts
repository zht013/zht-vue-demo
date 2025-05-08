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
    INTRODUCE: Symbol(),
  },
  D3: {
    ROOT: Symbol(),
    INTRODUCE: Symbol(),
  },
  THREE: {
    ROOT: Symbol(),
    INTRODUCE: Symbol(),
  },
  DV_PROJECT: {
    HOME: Symbol(),
  },
}
