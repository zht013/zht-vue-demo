<script setup lang="ts">
const version = __APP_VERSION__
const gitCommitHash = __GIT_COMMIT_HASH__
const buildTime = new Date(__BUILD_TIME__).toLocaleString()
const env = import.meta.env.MODE
</script>

<template>
  <p>
    <span>{{ env }}</span>
    <span>v{{ version }}</span>
    <span>{{ gitCommitHash }}</span>
    <span>{{ buildTime }}</span>
  </p>
</template>

<style scoped>
span:not(:first-child) {
  margin-left: 0.8rem;
}
</style>
