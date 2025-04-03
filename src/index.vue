<template>
  <component
    :is="currentPlayer"
    ref="audioPlayerRef"
    v-bind="props"
    v-on="$attrs"
    @timeupdate="$emit('timeupdate')"
    @play="$emit('play')"
    @pause="$emit('pause')"
    @play-next="$emit('play-next')"
    @play-prev="$emit('play-prev')"
    @play-error="(error: unknown) => $emit('play-error', error)"
    @ended="event => $emit('ended', event)"
    @durationchange="event => $emit('durationchange', event)"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Vue3AudioPlayer from './Vue3AudioPlayer.vue'
import TlAudioPlayer from './TlAudioPlayer.vue'
import type { AudioPlayerProps } from './types'

// 使用组件工厂模式
const currentPlayer = computed(() => (props.mode === 'default' ? Vue3AudioPlayer : TlAudioPlayer))

interface Props extends AudioPlayerProps {
  mode?: 'default' | 'tl'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'default',
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

const audioPlayerRef = ref()

// 使用 computed 确保响应式
const exposed = {
  play: () => audioPlayerRef.value?.play(),
  pause: () => audioPlayerRef.value?.pause(),
  playNext: () => audioPlayerRef.value?.playNext(),
  playPrev: () => audioPlayerRef.value?.playPrev(),
  audio: computed(() => audioPlayerRef.value?.audio),
  isPlaying: computed(() => audioPlayerRef.value?.isPlaying),
  isLoading: computed(() => audioPlayerRef.value?.isLoading),
  currentTime: computed(() => audioPlayerRef.value?.currentTime),
  duration: computed(() => audioPlayerRef.value?.duration),
  currentTimeFormatted: computed(() => audioPlayerRef.value?.currentTimeFormatted),
  durationFormatted: computed(() => audioPlayerRef.value?.durationFormatted),
  currentVolume: computed(() => audioPlayerRef.value?.currentVolume),
  playbackRate: computed(() => audioPlayerRef.value?.playbackRate),
  currentPlayIndex: computed(() => audioPlayerRef.value?.currentPlayIndex),
  isShowErrorMessage: computed(() => audioPlayerRef.value?.isShowErrorMessage),
  noticeMessage: computed(() => audioPlayerRef.value?.noticeMessage)
}

defineExpose(exposed)
</script>
