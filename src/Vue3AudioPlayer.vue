<template>
  <div class="vue-audio-player">
    <div class="vue-audio-player__btn-wrap">
      <PlaybackRate
        v-if="showPlaybackRate"
        :theme-color="themeColor"
        :playback-rate="playbackRate"
        :playback-rates="playbackRates"
        @change="handleSetPlaybackRate"
      />

      <PlayControls
        :show-prev="showPrevButton"
        :show-next="showNextButton"
        :show-play="showPlayButton"
        :show-loading="showPlayLoading"
        :is-playing="isPlaying"
        :is-loading="isLoading"
        :theme-color="themeColor"
        :is-loop="isLoop"
        :current-index="currentPlayIndex"
        :total="audioList.length"
        @play="play"
        @pause="pause"
        @prev="playPrev"
        @next="playNext"
      />

      <VolumeControl
        v-if="showVolumeButton"
        :theme-color="themeColor"
        :volume="currentVolume"
        @volume-change="handleVolumeChange"
      />

      <div v-show="isShowErrorMessage" class="vue-audio-player__notice">
        {{ noticeMessage }}
      </div>
    </div>

    <ProgressBar
      v-show="showProgressBar"
      :current-time="currentTime"
      :duration="duration"
      :theme-color="themeColor"
      :disabled-drag="disabledProgressDrag"
      :disabled-click="disabledProgressClick"
      @time-update="handleTimeUpdate"
      @progress-start="handleProgressStart"
      @progress-end="handleProgressEnd"
      @progress-move="handleProgressMove"
      @progress-click="handleProgressClick"
    />

    <TimeDisplay
      v-show="showProgressBar"
      :current-time="currentTimeFormatted"
      :duration="durationFormatted"
    />

    <!-- ts-ignore -->
    <audio
      ref="audio"
      class="vue-audio-player__audio"
      :src="audioList?.[currentPlayIndex]?.src"
      v-bind="$attrs"
      @ended="onEnded"
      @durationchange="onDurationchange"
    >
      浏览器太老咯，请升级浏览器吧~
    </audio>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import PlaybackRate from './components/PlaybackRate.vue'
import PlayControls from './components/PlayControls.vue'
import VolumeControl from './components/VolumeControl.vue'
import ProgressBar from './components/ProgressBar.vue'
import TimeDisplay from './components/TimeDisplay.vue'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import type { AudioPlayerProps } from './types'
// Props 定义
const props = withDefaults(defineProps<AudioPlayerProps>(), {
  audioList: () => [],
  showPlayButton: true,
  showPrevButton: true,
  showNextButton: true,
  showVolumeButton: true,
  showProgressBar: true,
  beforePlay: undefined,
  beforePrev: undefined,
  beforeNext: undefined,
  isLoop: true,
  isAutoPlayNext: true,
  progressInterval: 500,
  showPlaybackRate: true,
  showPlayLoading: true,
  playbackRates: () => [0.5, 1, 1.5, 2],
  themeColor: '#EC4141',
  disabledProgressDrag: false,
  disabledProgressClick: false
})

const emit = defineEmits<{
  (e: 'timeupdate'): void
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'play-next'): void
  (e: 'play-prev'): void
  (e: 'play-error', error: any): void
  (e: 'ended', event: Event): void
  (e: 'durationchange', event: Event): void
}>()

const {
  audio,
  isPlaying,
  isLoading,
  currentTime,
  duration,
  currentTimeFormatted,
  durationFormatted,
  currentVolume,
  playbackRate,
  currentPlayIndex,
  isShowErrorMessage,
  noticeMessage,
  play,
  pause,
  playNext,
  playPrev,
  handleSetPlaybackRate,
  handleVolumeChange,
  handleTimeUpdate,
  handleProgressStart,
  handleProgressEnd,
  handleProgressMove,
  handleProgressClick,
  onEnded,
  onDurationchange
} = useAudioPlayer(props, emit)

console.log('===>', props)

// 提供共享状态给子组件
provide('audioPlayer', {
  audio,
  isPlaying,
  currentTime,
  duration
})

defineExpose({
  audio,
  isPlaying,
  isLoading,
  currentTime,
  duration,
  currentTimeFormatted,
  durationFormatted,
  currentVolume,
  playbackRate,
  currentPlayIndex,
  isShowErrorMessage,
  noticeMessage,
  play,
  pause,
  playNext,
  playPrev
})
</script>

<style>
.vue-audio-player {
  width: 100%;
  padding: 16px;
  box-sizing: border-box;
  user-select: none;
}

.vue-audio-player__btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}

.vue-audio-player__notice {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 16px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
}

.vue-audio-player__audio {
  display: none;
}

/* 过渡动画 */
.fade-volume-enter-active,
.fade-volume-leave-active,
.fade-rate-enter-active,
.fade-rate-leave-active {
  transition: opacity 0.3s ease;
}

.fade-volume-enter-from,
.fade-volume-leave-to,
.fade-rate-enter-from,
.fade-rate-leave-to {
  opacity: 0;
}
</style>
