import { refAutoReset, useDebounceFn, useEventListener, useWindowScroll } from '@vueuse/core'

export function usePullToRefresh(onRefresh: () => Promise<void>) {
  let isRefreshing = false
  let startY = 0
  let isScrolling = false
  const isPullEnd = refAutoReset(false, 300)
  const pullDistance = ref(0)
  const pullThreshold = 21
  let ratio = 0.12

  const { arrivedState } = useWindowScroll()

  /**
   * 设置初始状态
   * @param clientY
   * @returns
   */
  function setStartState(clientY: number) {
    if (isScrolling || !arrivedState.top) return

    pullDistance.value = 0
    isScrolling = true
    startY = clientY
  }

  /**
   * 设置下拉距离
   * @param clientY
   * @returns
   */
  function setPullDistance(clientY: number) {
    if (!isScrolling || !arrivedState.top) return

    const distance = Math.abs(clientY - startY)

    // 只有向下拉时才生效
    if (distance > 0) {
      pullDistance.value = Math.min(distance * ratio, pullThreshold * 2)
    }
  }

  /**
   * 执行刷新
   */
  async function doRefresh() {
    const distance = pullDistance.value
    pullDistance.value = 0

    if (isRefreshing || !arrivedState.top) return

    isScrolling = false
    isPullEnd.value = true

    if (distance > pullThreshold) {
      isRefreshing = true
      try {
        await onRefresh()
      } finally {
        isRefreshing = false
      }
    }
  }

  function handleTouchStart(e: TouchEvent) {
    ratio = 0.12

    setStartState(e.touches[0].clientY)
  }

  function handleTouchMove(e: TouchEvent) {
    setPullDistance(e.touches[0].clientY)
  }

  function handleTouchEnd() {
    doRefresh()
  }

  let wheelEnded = false
  const overScrolling = useDebounceFn(() => {
    wheelEnded = false
  }, 150)
  function handleWheel(e: WheelEvent) {
    if (!arrivedState.top) return

    ratio = 0.56

    if (wheelEnded) {
      overScrolling()
    }

    // 向上滚动时
    if (e.deltaY < 0 && !wheelEnded) {
      setStartState(e.clientY)
      setPullDistance(e.clientY)
    }

    // 当滚轮停止时
    if (e.deltaY === 0) {
      wheelEnded = true
      overScrolling()

      doRefresh()
    }
  }

  useEventListener('touchstart', handleTouchStart)
  useEventListener('touchmove', handleTouchMove, { passive: true })
  useEventListener('touchend', handleTouchEnd)
  useEventListener('wheel', handleWheel, { passive: true })

  return {
    distance: pullDistance,
    isPullEnd,
  }
}
