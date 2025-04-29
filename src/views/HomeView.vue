<script setup lang="ts">
import useAppI18n from '@/composables/useAppI18n'

const { t } = useAppI18n()
</script>

<template>
  <div>
    <h2>{{ t('label.home') }}</h2>
  </div>
</template>

<style scoped></style>
