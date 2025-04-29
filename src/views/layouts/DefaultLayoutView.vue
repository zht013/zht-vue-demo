<script setup lang="ts"></script>

<template>
  <div class="layout">
    <ToolBar />

    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-flow: column nowrap;
}

.main {
  flex: 1;
}
</style>
