<template>
  <div class="tl-audio-player">
    <div class="tl-audio-player__content">
      <div class="tl-audio-player__controls">
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
      </div>

      <div class="tl-audio-plauer__timewrap">
        <!-- 添加标题插槽 -->
        <div class="tl-audio-player__title">
          <slot name="title">
            {{ audioList[currentPlayIndex]?.title || '未知音频' }}
          </slot>
        </div>

        <div class="tl-audio-player__progress">
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
        </div>

        <div class="tl-audio-player__time">
          <TimeDisplay
            v-show="showProgressBar"
            :current-time="currentTimeFormatted"
            :duration="durationFormatted"
          />
        </div>
      </div>

      <div v-show="isShowErrorMessage" class="tl-audio-player__notice">
        {{ noticeMessage }}
      </div>
    </div>

    <audio
      ref="audio"
      class="tl-audio-player__audio"
      :src="audioList?.[currentPlayIndex]?.src"
      v-bind="$attrs"
      @ended="onEnded"
      @durationchange="onDurationchange"
    >
      浏览器不支持音频播放，请升级浏览器
    </audio>
  </div>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import PlayControls from './components/PlayControls.vue'
import ProgressBar from './components/ProgressBar.vue'
import TimeDisplay from './components/TimeDisplay.vue'
import { useAudioPlayer } from './hooks/useAudioPlayer'
import VolumeControl from './components/VolumeControl.vue'
import type { AudioPlayerProps } from './types'

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
  themeColor: '#1890ff',
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
  handleTimeUpdate,
  handleProgressStart,
  handleProgressEnd,
  handleProgressMove,
  handleProgressClick,
  onEnded,
  onDurationchange,
  handleVolumeChange
} = useAudioPlayer(props, emit)

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
  play,
  pause,
  playNext,
  playPrev
})
</script>

<style scoped>
.tl-audio-player {
  width: 100%;
  background: url(./assets/wave-bg.png) no-repeat center/cover;
  border-radius: 4px;
  padding: 8px 16px;
  box-sizing: border-box;
  position: relative; /* 添加这行 */
}

/* 添加一个半透明遮罩层，确保内容可见 */
.tl-audio-player::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(245, 247, 250, 0.15); /* 使用原来的背景色，但增加透明度 */
  border-radius: 4px;
  z-index: 0;
}

.tl-audio-player__content {
  position: relative; /* 添加这行 */
  z-index: 1; /* 添加这行，确保内容在遮罩层上方 */
  display: flex;
  align-items: center;
  gap: 16px;
}

.tl-audio-player__controls {
  display: flex;
  align-items: center;
}

.tl-audio-plauer__timewrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tl-audio-player__title {
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tl-audio-player__progress {
  flex: 1;
  margin: 0 8px;
}

.tl-audio-player__time {
  min-width: 120px;
  text-align: right;
}

.tl-audio-player__notice {
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

.tl-audio-player__audio {
  display: none;
}
</style>
