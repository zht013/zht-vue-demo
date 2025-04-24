<script setup lang="ts">
import type { MessageSchema } from '@/i18n'
import { useI18n } from 'vue-i18n'

const { t } = useI18n<[MessageSchema]>()
</script>

<template>
  <div class="about">
    <h1>{{ t('messages.about') }}</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
