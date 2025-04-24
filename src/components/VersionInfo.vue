<script setup lang="ts">
const version = __APP_VERSION__
const gitHash = __GIT_HASH__
const buildTime = new Date(__BUILD_TIME__).toLocaleString()
const env = import.meta.env.MODE
</script>

<template>
  <p>
    <span>Version: {{ version }}</span>
    <span>Build: {{ buildTime }}</span>
    <span>Commit: {{ gitHash }}</span>
    <span>Environment: {{ env }}</span>
  </p>
</template>

<style scoped>
p {
  font-size: 0.8rem;
  color: var(--color-text);
  text-align: center;
  margin-top: 1rem;

  span {
    margin-left: 0.5rem;
  }
}
</style>
