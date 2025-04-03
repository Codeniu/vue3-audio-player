<template>
  <div class="vue-audio-player__play-volume-icon-wrap">
    <VolumeIcon
      class="vue-audio-player__play-icon"
      :style="{ color: themeColor }"
      @click.stop="toggleVolume"
    />

    <transition name="fade-volume">
      <div
        v-show="isShowVolume"
        ref="volumeWrap"
        class="vue-audio-player__play-volume-wrap"
        @click.stop="handleVolumeClick"
      >
        <div
          ref="volumeBar"
          class="vue-audio-player__play-volume"
          :style="{
            height: volume * 100 + '%',
            backgroundColor: themeColor
          }"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { VolumeIcon } from './icons/index'
import { useVolume } from '../hooks/useVolume.ts'

const props = defineProps<{
  themeColor: string
  volume: number
}>()

const emit = defineEmits<{
  (e: 'volumeChange', volume: number): void
}>()

const isShowVolume = ref(false)
const { volumeWrap, volumeBar, handleVolumeClick } = useVolume(props, emit)

const toggleVolume = () => {
  isShowVolume.value = !isShowVolume.value
}
</script>

<style scoped>
.vue-audio-player__play-volume-icon-wrap {
  position: relative;
  margin-left: 16px;
  height: 21px;
}

.vue-audio-player__play-icon {
  width: 21px;
  height: 21px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  fill: currentColor;
}

.vue-audio-player__play-volume-wrap {
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 50px;
  background-color: #e6e6e6;
  border-radius: 2px;
  cursor: pointer;
}

.vue-audio-player__play-volume {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-radius: 2px;
}

/* 添加过渡动画样式 */
.fade-volume-enter-active,
.fade-volume-leave-active {
  transition: opacity 0.3s ease;
}

.fade-volume-enter-from,
.fade-volume-leave-to {
  opacity: 0;
}

@media (any-hover: hover) {
  .vue-audio-player__play-icon:hover {
    opacity: 0.7;
  }
}
</style>
