<script setup lang="ts">
const version = __APP_VERSION__
const gitHash = __GIT_HASH__
const buildTime = new Date(__BUILD_TIME__).toLocaleString()
const env = import.meta.env.MODE
const isProd = import.meta.env.PROD
</script>

<template>
  <p>
    <span>Version: {{ version }}</span>
    <template v-if="!isProd">
      <span>Commit: {{ gitHash }}</span>
      <span>Build: {{ buildTime }}</span>
      <span>Environment: {{ env }}</span>
    </template>
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
