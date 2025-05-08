<script setup lang="ts">
import { EventKeys } from '@/constants/keys'
import { useEventBus } from '@vueuse/core'
import { darkTheme } from 'naive-ui'

const bus = useEventBus(EventKeys.themeChanged)

function test() {
  bus.emit(darkTheme)
}
</script>

<template>
  <div>
    <button @click="test">Event bus</button>
    Home
  </div>
</template>

<style scoped></style>
