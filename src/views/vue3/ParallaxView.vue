<script setup lang="ts">
import { useParallax } from '@vueuse/core'
import rabbit0 from '@/assets/rabbit0.png'
import rabbit1 from '@/assets/rabbit1.png'
import rabbit2 from '@/assets/rabbit2.png'
import rabbit3 from '@/assets/rabbit3.png'
import { NCard, useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const parallaxRef = useTemplateRef('parallaxRef')
const images = [rabbit0, rabbit1, rabbit2, rabbit3]
const { tilt, roll } = useParallax(parallaxRef)

const parallaxBgRef = useTemplateRef('parallaxBgRef')
const { tilt: bgTilt, roll: bgRoll } = useParallax(parallaxBgRef)
</script>
<template>
  <div
    :style="{
      '--bg-color': themeVars.bgColor,
      '--border-color': themeVars.borderColor,
    }"
  >
    <NCard
      title="图片"
      :style="{
        '--img-tilt': tilt,
        '--img-roll': roll,
      }"
    >
      <div ref="parallaxRef" class="card-wrapper">
        <div
          :style="{
            perspective: `${roll === 0.5 || tilt === -0.5 ? 0 : 30}rem`,
          }"
        >
          <div
            :style="{
              transform: `rotateX(${(roll === 0.5 ? 0 : roll) * 20}deg) rotateY(${(tilt === -0.5 ? 0 : tilt) * 20}deg)`,
            }"
            class="img-parallax"
          >
            <img
              v-for="(img, index) in images"
              :key="img"
              :style="{
                transform: `translateX(${tilt * 10 * (index + 1)}px) translateY(${roll * 10 * (index + 1)}px) scale(1.33)`,
              }"
              :src="img"
              class="img"
              alt=""
            />
          </div>
        </div>
      </div>
    </NCard>

    <NCard
      title="背景图片"
      :style="{
        '--bg-tilt': bgTilt,
        '--bg-roll': bgRoll,
      }"
    >
      <div ref="parallaxBgRef" class="card-wrapper bg-card">
        <div
          :style="{
            backgroundPosition: `${bgTilt * 60 + 50}% ${bgRoll * 60 + 50}%, ${bgTilt * 35 + 50}% ${bgRoll * 35 + 50}%, ${bgTilt * 50 * -1 + 50}% ${bgRoll * 50 * -1 + 50}%, ${bgTilt * 20 + 50}% ${bgRoll * 20 + 50}%`,
          }"
          class="bg-parallax"
        ></div>
      </div>
    </NCard>
  </div>
</template>

<style scoped>
.card-wrapper {
  background: var(--bg-color);
  height: 40rem;
  border: 1px solid var(--border-color);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &.bg-card {
    height: 50rem;
  }
}

.img-parallax {
  position: relative;
  height: 38.4rem;
  width: 28.8rem;
  max-width: 90%;
  overflow: hidden;
  border-radius: 0.6rem;
  border: 1px solid var(--border-color);
  /* transition: transform 0.2s ease; */

  .img {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 0.2s ease-out;
  }
}

.bg-parallax {
  background-image:
    url('@/assets/rabbit3.png'), url('@/assets/rabbit2.png'), url('@/assets/rabbit1.png'),
    url('@/assets/rabbit0.png');
  background-repeat: no-repeat;
  background-size: 120% 120%;
  background-position: 50% 50%;
  height: 40rem;
  width: 40rem;
  max-width: 90%;
  border: 1px solid var(--border-color);
  border-radius: 0.6rem;
  transition: background-position 0.3s ease-out;
}
</style>
