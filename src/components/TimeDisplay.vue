<template>
  <div class="vue-audio-player__time-wrap">
    <div class="vue-audio-player__current-time">
      {{ currentTime }}
    </div>
    <div class="vue-audio-player__duration">
      {{ duration }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  currentTime: string
  duration: string
}>()
</script>

<style scoped>
.vue-audio-player__time-wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 7px;
}

.vue-audio-player__current-time,
.vue-audio-player__duration {
  font-size: 10px;
  color: #888;
}
</style>
