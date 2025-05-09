import { breakpointsMasterCss, useBreakpoints } from '@vueuse/core'

/**
 * 响应性的视口断点
 *
 * @default breakpointsMasterCss = {
    '3xs': 360,
    '2xs': 480,
    'xs': 600,
    'sm': 768,
    'md': 1024,
    'lg': 1280,
    'xl': 1440,
    '2xl': 1600,
    '3xl': 1920,
    '4xl': 2560,
  }
 */
export function useAppBreakpoints() {
  const breakpoints = useBreakpoints(breakpointsMasterCss)
  const isMobile = breakpoints.smaller('sm')
  const isTablet = computed(() => {
    return breakpoints.between('sm', 'md').value || breakpoints.md.value
  })
  const isDesktop = breakpoints.greater('md')

  return {
    isMobile,
    isTablet,
    isDesktop,
    ...breakpoints,
  }
}
