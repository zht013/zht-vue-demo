<script setup lang="ts">
import { useIntersectionObserver, useScroll, useScrollLock, useWindowScroll } from '@vueuse/core'
import { useThemeVars } from 'naive-ui'

const themeVars = useThemeVars()
const { directions: windowScrollDirections, arrivedState: windowScrollArrivedState } =
  useWindowScroll({
    onScroll: () => {
      handleVideoWidthOnScroll()
    },
  })

// #region S1
const s1SectionRef = useTemplateRef('s1SectionRef')
const { y: s1ScrollY, arrivedState: s1ArrivedState } = useScroll(s1SectionRef)
const isS1ScrollLocked = useScrollLock(s1SectionRef, false)
// 旋转立方体
const rotate3D = computed(() => {
  if (s1ScrollY.value > 0) {
    return `rotate3D(1, 1, 0, ${s1ScrollY.value}deg)`
  } else {
    return 'rotate3D(1, 1, 0, 50deg)'
  }
})
// 禁用或启用滚动条
const s1LayerConRef = useTemplateRef('s1LayerConRef')
const isS1LayerConScrollLocked = useScrollLock(s1LayerConRef)
watch(
  () => windowScrollArrivedState.top,
  () => {
    if (windowScrollArrivedState.top) {
      isS1ScrollLocked.value = false
    } else {
      isS1ScrollLocked.value = true
    }
  },
)
watchEffect(() => {
  // 当到达底部时，锁定滚动
  // 但是当到达顶部时，解锁滚动
  isS1LayerConScrollLocked.value = !windowScrollArrivedState.top || !s1ArrivedState.bottom
})
// #endregion S1

// #region H2
const s2h2Ref = useTemplateRef<HTMLElement>('s2h2Ref')
const s3h2_1Ref = useTemplateRef<HTMLElement>('s3h2-1Ref')
const s3h2_2Ref = useTemplateRef<HTMLElement>('s3h2-2Ref')
const s4h2Ref = useTemplateRef<HTMLElement>('s4h2Ref')
useIntersectionObserver(
  [s2h2Ref, s3h2_1Ref, s3h2_2Ref, s4h2Ref],
  ([entry], observer) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
      observer.unobserve(entry.target)
    }
  },
  {
    threshold: 1,
  },
)
// #endregion H2

// #region S2
const s2VideoContainerRef = useTemplateRef<HTMLVideoElement>('s2VideoContainerRef')
const s2VideoClipRatio = ref(0)
const s2VideoPlaying = ref(false)
useIntersectionObserver(
  s2VideoContainerRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      ;(entry.target.children[0] as HTMLVideoElement).play()
    } else {
      ;(entry.target.children[0] as HTMLVideoElement).pause()
    }

    s2VideoPlaying.value = entry.isIntersecting
  },
  {
    threshold: 0.7,
  },
)
const handleVideoWidthOnScroll = () => {
  // 向下滚动
  if (windowScrollDirections.bottom) {
    if (s2VideoClipRatio.value === 1) return

    const rect = s2VideoContainerRef.value!.getBoundingClientRect()
    // 如果视频顶部距离窗口顶部小于 100px，则增加 clipRatio
    if (rect.top < 100) {
      s2VideoClipRatio.value = Math.min(1, s2VideoClipRatio.value + 0.02)
    }
  } else if (windowScrollDirections.top) {
    if (s2VideoClipRatio.value > 0) {
      // 向上滚动
      s2VideoClipRatio.value = Math.max(0, s2VideoClipRatio.value - 0.02)
    }
  }
}
const togglePlayPause = (video: HTMLVideoElement) => {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }

  s2VideoPlaying.value = !video.paused
}
// #endregion

// #region S3
const s3CardListRef = useTemplateRef<HTMLElement>('s3CardListRef')
const s3CardListScrollLeft = ref(0)
const s3CardListCanMoveToPrevItem = computed(() => {
  if (!s3CardListRef.value) return false

  return s3CardListScrollLeft.value > 0
})
const s3CardListCanMoveToNextItem = computed(() => {
  if (!s3CardListRef.value) return false

  return (
    Math.ceil(s3CardListScrollLeft.value) <
    s3CardListRef.value.scrollWidth - s3CardListRef.value.clientWidth
  )
})
const handleS3CardListScrollToPrev = () => {
  const cardListElement = s3CardListRef.value!
  const firstChild = cardListElement.children[0] as HTMLElement
  const targetLeft = cardListElement.scrollLeft - firstChild.offsetWidth
  cardListElement.scroll({
    left: targetLeft < 0 ? 0 : targetLeft,
    behavior: 'smooth',
  })
}
const handleS3CardListScrollToNext = () => {
  const cardListElement = s3CardListRef.value!
  const firstChild = cardListElement.children[0] as HTMLElement
  const targetLeft = cardListElement.scrollLeft + firstChild.offsetWidth
  const totalLeft = cardListElement.scrollWidth - cardListElement.clientWidth
  cardListElement.scroll({
    left: targetLeft >= totalLeft ? totalLeft : targetLeft,
    behavior: 'smooth',
  })
}

// 监听 s3CardList 的滚动事件
useScroll(s3CardListRef, {
  onStop: (e) => {
    s3CardListScrollLeft.value = (e.target! as HTMLElement).scrollLeft
  },
})

// 监听 s3CardList 的可见性变化
useIntersectionObserver(
  s3CardListRef,
  ([entry], observer) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
      observer.unobserve(entry.target)
    }
  },
  {
    threshold: 0.3,
  },
)

// 监听轮播列表的可见性变化
const s3CarouselScrollLocked = ref(true)
const s3CarouselContainerRef = useTemplateRef<HTMLElement>('s3CarouselContainerRef')
useIntersectionObserver(
  s3CarouselContainerRef,
  ([entry], observer) => {
    if (entry.isIntersecting) {
      if (entry.intersectionRatio > 0.98) {
        observer.unobserve(entry.target)
        s3CarouselScrollLocked.value = false
      } else {
        entry.target.classList.add('active')
        s3CarouselScrollLocked.value = true
      }
    }
  },
  {
    threshold: [0.2, 0.99],
  },
)
// #endregion s3

// #region S4
const s4SectionRef = useTemplateRef('s4SectionRef')
useIntersectionObserver(
  s4SectionRef,
  ([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active')
      entry.target.firstElementChild!.classList.add('animating')
    }
  },
  {
    threshold: 0.1,
  },
)

const handleS4AniAnimationEnd = (e: AnimationEvent) => {
  ;(e.target as HTMLElement).classList.remove('animating')
}
// #endregion S4
</script>

<template>
  <div
    class="scroll-parallax-root"
    :style="{
      '--sb-padding-left-right': '6vw',
      '--odd-bg-color': themeVars.bgColor1,
    }"
  >
    <section
      ref="s1SectionRef"
      class="s1 scroll-hide"
      :style="{
        '--rotate3D': rotate3D,
        '--cube-size': '6',
      }"
    >
      <div class="s1-layer s1-layer-back1"></div>
      <div class="s1-layer s1-layer-back2"></div>
      <div class="s1-layer s1-layer-back3"></div>
      <div class="s1-layer s1-layer-base cube-scene">
        <div class="cube">
          <div class="cube-face cube-face-front"></div>
          <div class="cube-face cube-face-back"></div>
          <div class="cube-face cube-face-left"></div>
          <div class="cube-face cube-face-right"></div>
          <div class="cube-face cube-face-top"></div>
          <div class="cube-face cube-face-bottom"></div>
        </div>
      </div>
      <div ref="s1LayerConRef" class="s1-layer s1-layer-base s1-layer-con scroll-hide">
        <h1>Parallax Scrolling</h1>
        <h2>Introduction to Parallax Scrolling</h2>
        <p>
          Parallax scrolling is a captivating visual technique widely used in web design, video
          games, and interactive media to create an illusion of depth and immersion. The effect is
          achieved by moving different layers of background content at varying speeds as the user
          scrolls or navigates through a page. This dynamic approach mimics the way objects appear
          to move at different rates when viewed from a moving perspective, much like how distant
          mountains seem to shift slower than nearby trees when you're traveling in a car.
        </p>

        <p>
          The technique dates back to traditional animation and early 2D video games, where artists
          manually layered backgrounds to simulate depth. However, with the advent of modern web
          technologies like CSS, JavaScript, and advanced graphics libraries, parallax scrolling has
          evolved into a sophisticated tool for enhancing user engagement. When implemented
          effectively, it can transform a static webpage into a visually rich, cinematic experience
          that guides the viewer’s attention and reinforces storytelling.
        </p>
        <h2>How Parallax Scrolling Works</h2>
        <p>
          At its core, parallax scrolling relies on the principle of relative motion. Designers
          separate visual elements into multiple planes—typically foreground, midground, and
          background layers—each assigned a different scrolling speed. As the user interacts with
          the page, these layers move in a coordinated yet distinct manner:
        </p>
        <ul>
          <li>
            <strong>Foreground elements</strong> (e.g., text, buttons, or interactive objects)
            scroll at the standard speed, staying firmly in the user’s immediate view.
          </li>
          <li>
            <strong>Midground elements</strong> (e.g., secondary imagery or decorative graphics)
            move slightly slower, creating a subtle sense of separation.
          </li>
          <li>
            <strong>Background elements</strong> (e.g., distant landscapes or atmospheric textures)
            drift at the slowest pace, enhancing the perception of depth.
          </li>
        </ul>
        <p>
          This multi-layered approach tricks the brain into interpreting the 2D space as a
          three-dimensional environment. Advanced implementations may also incorporate mouse
          movement tracking, where tilting or moving the cursor influences the direction and
          intensity of the parallax effect, further deepening immersion.
        </p>
      </div>
    </section>

    <section class="sb s2">
      <h2 ref="s2h2Ref">Video</h2>
      <div
        ref="s2VideoContainerRef"
        class="video-container"
        :style="{
          '--clip-ratio': s2VideoClipRatio,
        }"
      >
        <video
          loop
          muted
          playsinline
          src="@/assets/sky_tiny.mp4"
          @click="togglePlayPause($event.currentTarget! as HTMLVideoElement)"
        ></video>

        <button
          class="icon-btn video-btn"
          @click="togglePlayPause(s2VideoContainerRef!.children[0] as HTMLVideoElement)"
        >
          <IconIonPauseCircle v-if="s2VideoPlaying" />
          <IconIonPlayCircle v-else />
        </button>
      </div>
    </section>

    <section class="sb s3">
      <h2 ref="s3h2-1Ref">Card List</h2>
      <div
        ref="s3CardListRef"
        class="s-con card-list scroll-hide"
        :style="{
          '--card-bg-color': themeVars.baseColor,
          '--card-border-color': themeVars.borderColor,
        }"
      >
        <div
          v-for="(item, index) in 10"
          :key="index"
          class="card"
          :style="{
            '--card-index': index + 1,
          }"
        >
          Card-{{ item }}
        </div>
      </div>

      <div
        class="card-list-controls"
        :style="{
          '--icon-color': themeVars.iconColor,
          '--icon-color-hover': themeVars.iconColorHover,
        }"
      >
        <button
          :disabled="!s3CardListCanMoveToPrevItem"
          class="icon-btn"
          @click="handleS3CardListScrollToPrev"
        >
          <IconIonChevronBackCircle />
        </button>
        <button
          :disabled="!s3CardListCanMoveToNextItem"
          class="icon-btn"
          @click="handleS3CardListScrollToNext"
        >
          <IconIonChevronForwardCircle />
        </button>
      </div>

      <h2 ref="s3h2-2Ref">Card Carousel</h2>
      <div class="s-con">
        <div
          ref="s3CarouselContainerRef"
          class="carousel-container scroll-hide"
          :style="{
            '--carousel-border-color': themeVars.borderColor,
            '--overflow-y': s3CarouselScrollLocked ? 'hidden' : 'auto',
          }"
        >
          <div class="carousel-item">
            <img src="@/assets/carousel1.jpg" loading="lazy" alt="" />
            <p class="desc">
              The beach is a symphony of serenity and motion. Golden sands stretch endlessly, warmed
              by the sun’s embrace, while the ocean whispers secrets in rhythmic waves. Turquoise
              waters shimmer under the sky’s vast canvas, blending seamlessly with the horizon.
            </p>
          </div>
          <div class="carousel-item">
            <img src="@/assets/carousel4.jpg" loading="lazy" alt="" />
            <p class="desc">
              The beach is a symphony of serenity and motion. Golden sands stretch endlessly, warmed
              by the sun’s embrace, while the ocean whispers secrets in rhythmic waves. Turquoise
              waters shimmer under the sky’s vast canvas, blending seamlessly with the horizon.
              <br />
              Golden sands stretch endlessly, warmed by the sun’s embrace, while the ocean whispers
              secrets in rhythmic waves. Turquoise waters shimmer under the sky’s vast canvas,
              blending seamlessly with the horizon.
            </p>
          </div>
          <div class="carousel-item">
            <img src="@/assets/carousel5.jpg" loading="lazy" alt="" />
            <p class="desc">
              The beach is a symphony of serenity and motion. Golden sands stretch endlessly, warmed
              by the sun’s embrace, while the ocean whispers secrets in rhythmic waves. Turquoise
              waters shimmer under the sky’s vast canvas, blending seamlessly with the horizon.
            </p>
          </div>
          <div class="carousel-item">
            <img src="@/assets/carousel3.jpg" loading="lazy" alt="" />
            <p class="desc">
              The beach is a symphony of serenity and motion. Golden sands stretch endlessly, warmed
              by the sun’s embrace, while the ocean whispers secrets in rhythmic waves. Turquoise
              waters shimmer under the sky’s vast canvas, blending seamlessly with the horizon.
              <br />
              The beach is a symphony of serenity and motion.
            </p>
          </div>
          <div class="carousel-item">
            <img src="@/assets/carousel2.jpg" loading="lazy" alt="" />
            <p class="desc">
              The beach is a symphony of serenity and motion. Golden sands stretch endlessly, warmed
              by the sun’s embrace, while the ocean whispers secrets in rhythmic waves. Turquoise
              waters shimmer under the sky’s vast canvas, blending seamlessly with the horizon.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section ref="s4SectionRef" class="sb s4">
      <div class="s4-ani" @animationend="handleS4AniAnimationEnd"></div>

      <h2 ref="s4h2Ref">Sticky</h2>

      <div class="s-con">
        <div class="sticky-container">
          <div
            class="sticky-item"
            :style="{
              '--top-position': themeVars.appHeaderHeight,
              '--border-color': themeVars.borderColor,
            }"
          >
            Parallax
          </div>
          <div class="desc">
            <h3>Parallax Scrolling: A Deep Dive into the Visual Effect</h3>

            <h4>Introduction to Parallax Scrolling</h4>

            <p>
              Parallax scrolling is a captivating visual technique widely used in web design, video
              games, and interactive media to create an illusion of depth and immersion. The effect
              is achieved by moving different layers of background content at varying speeds as the
              user scrolls or navigates through a page. This dynamic approach mimics the way objects
              appear to move at different rates when viewed from a moving perspective, much like how
              distant mountains seem to shift slower than nearby trees when you're traveling in a
              car. The technique dates back to traditional animation and early 2D video games, where
              artists manually layered backgrounds to simulate depth. However, with the advent of
              modern web technologies like CSS, JavaScript, and advanced graphics libraries,
              parallax scrolling has evolved into a sophisticated tool for enhancing user
              engagement. When implemented effectively, it can transform a static webpage into a
              visually rich, cinematic experience that guides the viewer’s attention and reinforces
              storytelling.
            </p>

            <h4>How Parallax Scrolling Works</h4>

            <p>
              At its core, parallax scrolling relies on the principle of relative motion. Designers
              separate visual elements into multiple planes—typically foreground, midground, and
              background layers—each assigned a different scrolling speed. As the user interacts
              with the page, these layers move in a coordinated yet distinct manner:
            </p>
            <ul>
              <li>
                <strong>Foreground elements</strong>(e.g., text, buttons, or interactive objects)
                scroll at the standard speed, staying firmly in the user’s immediate view.
              </li>
              <li>
                <strong>Midground elements</strong>(e.g., secondary imagery or decorative graphics)
                move slightly slower, creating a subtle sense of separation.
              </li>
              <li>
                <strong>Background elements</strong>(e.g., distant landscapes or atmospheric
                textures) drift at the slowest pace, enhancing the perception of depth.
              </li>
            </ul>
            <p>
              This multi-layered approach tricks the brain into interpreting the 2D space as a
              three-dimensional environment. Advanced implementations may also incorporate mouse
              movement tracking, where tilting or moving the cursor influences the direction and
              intensity of the parallax effect, further deepening immersion.
            </p>

            <h4>Applications and Benefits</h4>

            <p>
              Parallax scrolling is particularly popular in storytelling websites, portfolio
              showcases, and marketing landing pages where visual impact is crucial. For instance, a
              company might use it to guide visitors through a product’s features by unfolding
              animations as they scroll, while an artist’s portfolio could employ subtle parallax to
              highlight different works in a dynamic gallery.
            </p>

            <p>The benefits of parallax scrolling include:</p>

            <ol>
              <li>
                <strong>Enhanced User Engagement</strong> – By breaking away from static layouts,
                the effect encourages visitors to explore content interactively.
              </li>
              <li>
                <strong>Improved Aesthetics</strong>– The depth and motion add polish and modernity
                to web design.
              </li>
              <li>
                <strong>Narrative Control</strong>– Designers can direct attention sequentially,
                ensuring key messages are delivered in a structured manner.
              </li>
            </ol>
            <p>
              However, overuse or poor implementation can lead to performance issues (especially on
              mobile devices) or distract from core content. Thus, balancing creativity with
              usability is essential.
            </p>

            <h4>Conclusion</h4>

            <p>
              Parallax scrolling remains a powerful tool for digital creators seeking to blend
              artistry with functionality. When executed thoughtfully, it elevates user experience
              by transforming ordinary navigation into an engaging journey. As technology advances,
              we can expect even more innovative adaptations—such as 3D parallax, VR integration, or
              AI-driven dynamic layers—pushing the boundaries of how we perceive and interact with
              digital spaces.
            </p>

            <p>
              Would you like additional details on specific frameworks or code examples for
              implementing parallax effects?
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/*#region common */
h1 {
  text-align: center;
  font-size: 6rem;
}

h2 {
  font-size: 4rem;
}

.sb {
  padding: 5rem 0 12rem;

  &:nth-child(odd) {
    background: var(--odd-bg-color);
  }

  h2 {
    display: inline-block;
    padding: 1.6rem var(--sb-padding-left-right);
    background: linear-gradient(
      120deg,
      hsl(204, 99%, 50%) 0%,
      hsl(311, 98%, 48%) 43%,
      hwb(18 1% 3%) 86%
    );
    background-clip: text;
    color: transparent;
    opacity: 0;
    transform: translateY(3rem);

    &.active {
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity 1s ease,
        transform 1s ease;
    }
  }

  .s-con {
    padding: 1.6rem var(--sb-padding-left-right) 4rem;

    &:last-child {
      padding-bottom: 0;
    }
  }
}
/*#endregion common */

/*#region S1 */
.s1 {
  perspective: 1px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  transform-style: preserve-3d;
  position: relative;
  will-change: transform;
}

/* 视差层通用样式 */
.s1-layer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 100vh 0;
}

/* 背景层 - 滚动较慢 */
.s1-layer-back1 {
  transform: translateZ(-2px) scale(3);
  background: url('@/assets/parallax0@2x.png') center/cover;
  z-index: -1;
}

.s1-layer-back2 {
  transform: translateZ(-1px) scale(2);
  background: url('@/assets/parallax1@2x.png') center/cover;
  z-index: -1;
}

.s1-layer-back3 {
  transform: translateZ(-0.5px) scale(1.5);
  background: url('@/assets/parallax3@2x.png') center/cover;
  z-index: 1;
}

/* 前景层 - 正常滚动 */
.s1-layer-base {
  transform: translateZ(0);
}

.s1-layer-con {
  background: hsl(39, 100%, 55%, 0.5);
  top: calc(120% + calc(var(--cube-size) * 1rem));
  height: calc(100vh - 20% - calc(var(--cube-size) * 1rem));
  padding: 3rem 15% 0;
  z-index: 2;
  box-shadow: 4px 0 10px 0 rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(0.5rem);
  color: #fff;
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 2rem;

  p {
    padding: 0 0 2rem;
  }

  ul {
    padding-bottom: 2rem;
  }
}
/*#endregion section 1 基础容器设置 */

/*#region 立方体样式 */
.cube-scene {
  width: calc(var(--cube-size) * 1rem);
  height: calc(var(--cube-size) * 1rem);
  perspective: 60rem;
  padding: 0;
  top: 110%;
  left: 50%;
  translate: -50% 0 0;
  z-index: 0;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: translateZ(calc(var(--cube-size) / 2 * -1rem)) var(--rotate3D);
  /* transition: transform 0.3s; */
}

.cube-face {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
  font-size: 3rem;
  font-weight: 600;
}

.cube-face-front {
  background: hsl(191, 87%, 70%, 0.9);
  transform: rotateY(0deg);
  transform: translateZ(calc(var(--cube-size) / 2 * 1rem));
}

.cube-face-back {
  background: hsla(120, 100%, 50%, 0.9);
  transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2 * 1rem));
}

.cube-face-left {
  background: hsl(55, 91%, 63%, 0.9);
  transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2 * 1rem));
}

.cube-face-right {
  background: hsla(240, 100%, 50%, 0.9);
  transform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2 * 1rem));
}

.cube-face-top {
  background: hsla(0, 100%, 50%, 0.9);
  transform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2 * 1rem));
}

.cube-face-bottom {
  background: hsla(300, 100%, 50%, 0.9);
  transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2 * 1rem));
}
/*#endregion 立方体样式 */

/*#region S2 */
.video-container {
  position: relative;
  width: 100vw;
  height: 70vh;
  margin: 2rem auto 0;
  clip-path: inset(
    0 calc(var(--clip-ratio) * var(--sb-padding-left-right)) round calc(var(--clip-ratio) * 3rem)
  );
  transition: clip-path 50ms ease;
}

video {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.video-btn {
  position: absolute;
  right: calc(var(--clip-ratio) * var(--sb-padding-left-right) + 3rem);
  bottom: 1.4rem;
  font-size: 4rem;
  color: #fff;
}
/*#endregion S2 */

/*#region S3 */
.s3 {
  position: relative;

  .card-list {
    display: flex;
    flex-wrap: nowrap;
    gap: 3rem;
    height: 44rem;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: inline mandatory;

    &.active {
      .card {
        opacity: 1;
        transform: translateY(0);
        transition:
          opacity 1.4s ease calc(90ms * var(--card-index)),
          transform 1s ease calc(90ms * var(--card-index));
      }
    }
  }

  .card-list-controls {
    text-align: right;
    padding: 0 6vw;

    .icon-btn {
      color: color-mix(in srgb, var(--icon-color) 100%, black 24%);
      font-size: 3.6rem;
    }
  }

  .card {
    flex-shrink: 0;
    width: 30rem;
    border-radius: 6%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    scroll-snap-align: center;
    opacity: 0;
    transform: translateY(calc(7rem * var(--card-index)));
    background: var(--card-bg-color);
    border: 0.2rem solid var(--card-border-color);
  }

  .carousel-container {
    border-radius: 1rem;
    height: 70vh;
    position: relative;
    overflow-x: hidden;
    overflow-y: var(--overflow-y);
    scroll-snap-type: block mandatory;
    border: 2px solid var(--carousel-border-color);
    opacity: 0;
    transform: translateY(4rem);

    &.active {
      opacity: 1;
      transform: translateY(0);
      transition:
        opacity 1s ease,
        transform 1s ease;
    }
  }

  .carousel-item {
    width: 100%;
    height: calc(100% - 0.1rem);
    scroll-snap-align: start;
    scroll-snap-stop: always;
    display: flex;
    flex-grow: row nowrap;
    align-items: center;
    padding: 0.4rem;

    img {
      width: 40%;
      height: 100%;
      object-fit: cover;
      border-radius: 1rem;
    }

    .desc {
      flex: 1;
      padding: 2rem;
      font-size: 2rem;
    }
  }
}
/*#endregion S3 */

/*#region S4 */
.s4 {
  position: relative;
  z-index: 0;

  .s4-ani {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 10rem;
    z-index: -1;
    opacity: 0;
    transform-origin: 50% 0;
    transform: scale(0);
    background:
      linear-gradient(40deg, rgb(255, 255, 255) 4%, rgba(255, 255, 255, 0.5) 15%, transparent 60%),
      linear-gradient(314deg, rgb(255, 255, 255) 4%, rgba(255, 255, 255, 0.5) 30%, transparent 60%),
      linear-gradient(7deg, #fff 20%, rgba(255, 255, 255, 0.6) 40%, rgba(0, 0, 0, 0) 70%),
      linear-gradient(358deg, #fff 20%, rgba(255, 255, 255, 0.6) 40%, rgba(0, 0, 0, 0) 70%),
      linear-gradient(120deg, hsl(204, 99%, 50%) 0%, hsl(311, 98%, 48%) 43%, hsl(18, 98%, 49%) 86%);

    &.animating {
      animation: s4Ani 2.6s ease-in-out forwards;
    }
  }
}

@keyframes s4Ani {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  20% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 1;
    transform: scaleY(0);
  }
}

.sticky-container {
  display: flex;
  flex-wrap: nowrap;

  .sticky-item {
    flex-shrink: 0;
    position: sticky;
    top: calc(var(--top-position) + 1rem);
    width: 30vw;
    height: 60vh;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 2rem;
    border: 2px solid var(--border-color);
  }

  .desc {
    flex: 1;
    font-size: 2rem;
    padding-left: 4rem;

    p {
      margin-bottom: 3rem;
    }
  }
}
/*#endregion S4 */
</style>
