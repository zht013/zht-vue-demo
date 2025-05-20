<script setup lang="ts">
import { useAppStore } from '@/stores/app'
import { NSwitch } from 'naive-ui'

const { routeHistoryEnabled, pullToRefreshEnabled } = storeToRefs(useAppStore())
</script>

<template>
  <div class="inline">
    <label>{{ $t('label.routeHistory') }}:</label>
    <NSwitch v-model:value="routeHistoryEnabled" :checked-value="true" :unchecked-value="false">
      <template #checked> {{ $t('label.enable') }} </template>
      <template #unchecked> {{ $t('label.disable') }} </template>
    </NSwitch>
  </div>
  <div class="inline">
    <label>{{ $t('label.pullToRefresh') }}:</label>
    <NSwitch v-model:value="pullToRefreshEnabled" :checked-value="true" :unchecked-value="false">
      <template #checked> {{ $t('label.enable') }} </template>
      <template #unchecked> {{ $t('label.disable') }} </template>
    </NSwitch>
  </div>
</template>

<style scoped>
label {
  font-size: 1.6rem;
}

.inline {
  display: flex;
  align-items: center;

  label {
    margin-right: 1.4rem;
  }
}
</style>
