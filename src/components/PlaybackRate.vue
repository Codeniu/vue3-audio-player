<template>
  <div class="vue-audio-player__play-rate" :style="{ color: themeColor }">
    <span @click.stop="toggleRates">{{ playbackRate.toFixed(1) + 'x' }}</span>
    <transition name="fade-rate">
      <div
        v-show="isShowRates"
        class="vue-audio-player__play-rate__dropdown"
        :style="{ backgroundColor: themeColor }"
      >
        <div v-for="rate in playbackRates" :key="'pr_' + rate" @click.stop="handleRateChange(rate)">
          {{ rate.toFixed(1) + 'x' }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts" name="PlaybackRate">
import { ref } from 'vue'

defineProps<{
  themeColor: string
  playbackRate: number
  playbackRates: number[]
}>()

const emit = defineEmits<{
  (e: 'change', rate: number): void
}>()

const isShowRates = ref(false)

const toggleRates = () => {
  isShowRates.value = !isShowRates.value
}

const handleRateChange = (rate: number) => {
  emit('change', rate)
  isShowRates.value = false
}
</script>

<style scoped>
.vue-audio-player__play-rate {
  position: relative;
  height: 21px;
  line-height: 21px;
  cursor: pointer;
  touch-action: none;
  user-select: none;
  font-size: 14px;
  margin-right: 16px;
}

.vue-audio-player__play-rate__dropdown {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2px;
  color: #fff;
  border-radius: 15px;
  font-size: 12px;
  overflow: hidden;
}

@media (any-hover: hover) {
  .vue-audio-player__play-rate:hover > span {
    opacity: 0.7;
  }
  .vue-audio-player__play-rate__dropdown > div:hover {
    opacity: 0.7;
  }
}
</style>
