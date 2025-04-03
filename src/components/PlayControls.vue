<template>
  <div class="play-controls">
    <div
      v-if="showPrev"
      class="vue-audio-player__play-prev"
      :class="{ disable: !isLoop && currentIndex === 0 }"
      @click.stop="handlePrev"
      :style="{ color: themeColor }"
    >
      <slot name="play-prev">
        <PrevIcon />
      </slot>
    </div>

    <div v-if="isLoading && showLoading" class="vue-audio-player__play-loading">
      <span v-for="item in 8" :key="item" :style="{ backgroundColor: themeColor }" />
    </div>

    <template v-else>
      <div
        v-if="!isPlaying && showPlay"
        class="vue-audio-player__play-start"
        @click.stop="emit('play')"
        :style="{ color: themeColor }"
      >
        <slot name="play-start">
          <PlayIcon />
        </slot>
      </div>

      <div
        v-else-if="showPlay"
        class="vue-audio-player__play-pause"
        @click.stop="emit('pause')"
        :style="{ color: themeColor }"
      >
        <slot name="play-pause">
          <PauseIcon />
        </slot>
      </div>
    </template>

    <div
      v-if="showNext"
      class="vue-audio-player__play-next"
      :class="{ disable: !isLoop && currentIndex === total - 1 }"
      @click.stop="handleNext"
      :style="{ color: themeColor }"
    >
      <slot name="play-next">
        <NextIcon />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PrevIcon, PlayIcon, PauseIcon, NextIcon } from './icons/index'

const props = defineProps<{
  showPrev: boolean
  showNext: boolean
  showPlay: boolean
  showLoading: boolean
  isPlaying: boolean
  isLoading: boolean
  themeColor: string
  isLoop: boolean
  currentIndex: number
  total: number
}>()

const emit = defineEmits<{
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'prev'): void
  (e: 'next'): void
}>()

const handlePrev = () => {
  if (props.currentIndex <= 0 && !props.isLoop) return
  emit('prev')
}

const handleNext = () => {
  if (props.currentIndex >= props.total - 1 && !props.isLoop) return
  emit('next')
}
</script>

<style scoped>
.play-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vue-audio-player__play-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
}

.vue-audio-player__play-prev,
.vue-audio-player__play-next {
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}

.vue-audio-player__play-prev svg,
.vue-audio-player__play-next svg {
  display: block;
  width: 21px;
  height: 33px;
}

.vue-audio-player__play-prev.disable,
.vue-audio-player__play-next.disable {
  opacity: 0.5;
}

.vue-audio-player__play-start,
.vue-audio-player__play-pause {
  margin: 0 16px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-drag: none;
}

.vue-audio-player__play-start svg,
.vue-audio-player__play-pause svg {
  display: block;
  width: 42px;
  height: 42px;
}

.vue-audio-player__play-loading {
  width: 42px;
  height: 42px;
  position: relative;
  margin: 0 16px;
}

.vue-audio-player__play-loading span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  animation: loading 1.04s ease infinite;
}

@keyframes loading {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

/* Loading animation positions */
.vue-audio-player__play-loading span:nth-child(1) {
  left: 0;
  top: 50%;
  margin-top: -4px;
  animation-delay: 0.13s;
}

.vue-audio-player__play-loading span:nth-child(2) {
  left: 7px;
  top: 7px;
  animation-delay: 0.26s;
}

.vue-audio-player__play-loading span:nth-child(3) {
  left: 50%;
  top: 0;
  margin-left: -4px;
  animation-delay: 0.39s;
}

.vue-audio-player__play-loading span:nth-child(4) {
  top: 7px;
  right: 7px;
  animation-delay: 0.52s;
}

.vue-audio-player__play-loading span:nth-child(5) {
  right: 0;
  top: 50%;
  margin-top: -4px;
  animation-delay: 0.65s;
}

.vue-audio-player__play-loading span:nth-child(6) {
  right: 7px;
  bottom: 7px;
  animation-delay: 0.78s;
}

.vue-audio-player__play-loading span:nth-child(7) {
  bottom: 0;
  left: 50%;
  margin-left: -4px;
  animation-delay: 0.91s;
}

.vue-audio-player__play-loading span:nth-child(8) {
  bottom: 7px;
  left: 7px;
  animation-delay: 1.04s;
}
</style>
