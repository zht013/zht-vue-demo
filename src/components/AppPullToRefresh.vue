<script setup lang="ts">
import { usePullToRefresh } from '@/composables/appPullToRefresh'

const props = defineProps<{
  refreshCallback: () => Promise<void>
}>()

const { distance, isPullEnd } = usePullToRefresh(props.refreshCallback)
</script>

<template>
  <div
    class="pull-refresh"
    :class="{
      animate: isPullEnd,
    }"
    :style="{
      '--pull-distance': distance,
    }"
  >
    刷新...
  </div>
</template>

<style scoped>
.pull-refresh {
  position: fixed;
  top: -2rem;
  left: 0;
  text-align: center;
  width: 100%;
  z-index: 100;
  opacity: 0.6;
  transform: translateY(calc(var(--pull-distance) * 1px));

  &.animate {
    transition: transform 200ms ease;
  }
}
</style>
