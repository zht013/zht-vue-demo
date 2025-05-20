<script setup lang="ts"></script>

<template>
  <div class="scroll-parallax-root">
    <div class="t-parent">
      <div class="t-child"></div>
    </div>
  </div>
</template>

<style scoped>
.scroll-parallax-root {
  height: 400vh;
}

.t-parent {
  /* overflow: hidden; */
  height: 30vh;
  background: rgba(0, 0, 0, 0.2);
}

.t-child {
  position: sticky;
  top: -1px;
  height: 4rem;
  background: yellow;
}
</style>
