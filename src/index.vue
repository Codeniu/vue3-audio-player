<template>
  <Vue3AudioPlayer v-if="mode === 'default'" v-bind="$props" v-on="$attrs" />
  <TlAudioPlayer v-else-if="mode === 'tl'" v-bind="$props" v-on="$attrs" />
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import Vue3AudioPlayer from './Vue3AudioPlayer.vue'
import TlAudioPlayer from './TlAudioPlayer.vue'
import type { AudioPlayerProps } from './types'

interface Props extends AudioPlayerProps {
  mode?: 'default' | 'tl'
}

withDefaults(defineProps<Props>(), {
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
</script>
