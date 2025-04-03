<template>
  <div
    ref="progressWrap"
    class="vue-audio-player__progress-wrap"
    :style="{
      cursor: disabledClick ? 'auto' : 'pointer'
    }"
    @click.stop="handleProgressClick"
  >
    <div
      ref="progress"
      class="vue-audio-player__progress"
      :style="{
        backgroundColor: themeColor
      }"
    />
    <div
      ref="progressPoint"
      class="vue-audio-player__progress-point"
      :style="{
        backgroundColor: themeColor,
        boxShadow: `0 0 10px 0 ${themeColor}`,
        cursor: disabledDrag ? 'auto' : 'pointer'
      }"
      @mousedown="handleProgressStart"
      @touchstart="handleProgressStart"
    />
  </div>
</template>

<script setup lang="ts">
import { useProgress } from '../hooks/useProgress'

const props = defineProps<{
  currentTime: string
  duration: number
  themeColor: string
  disabledDrag: boolean
  disabledClick: boolean
}>()

const emit = defineEmits<{
  (e: 'timeUpdate', time: number): void
  (e: 'progressStart', event: Event): void
  (e: 'progressEnd', event: Event): void
  (e: 'progressMove', event: Event): void
  (e: 'progressClick', event: Event): void
}>()

const { progressWrap, progress, progressPoint, handleProgressClick, handleProgressStart } =
  useProgress(props, emit)
</script>

<style scoped>
.vue-audio-player__progress-wrap {
  position: relative;
  height: 4px;
  background-color: #e6e6e6;
  border-radius: 2px;
  touch-action: none;
}

.vue-audio-player__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  border-radius: 2px;
  transition: width 0.1s ease;
}

.vue-audio-player__progress-point {
  position: absolute;
  top: 50%;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: left 0.1s ease;
}

@media (any-hover: hover) {
  .vue-audio-player__progress-wrap:hover .vue-audio-player__progress-point {
    transform: translate(-50%, -50%) scale(1.2);
  }
}
</style>
