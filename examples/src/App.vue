<template>
  <div style="text-align: center; color: #4ab7bd">
    <h1>vue3-audio-player</h1>
  </div>

  <div class="audio-container">
    <div class="name">
      {{ currentAudioName || audioList[0].title }}
    </div>
    <vue3-audio-player
      ref="audioPlayer"
      :audio-list="audioList"
      :before-play="handleBeforePlay"
      :show-play-loading="true"
      :showVolumeButton="false"
      @ended="handleEnded"
      themeColor="#0c4c7d"
    >
    </vue3-audio-player>

    <button @click="handlePlaySpecify">Play the second audio</button>
  </div>

  <div class="audio-container">
    <h3>自定义样式</h3>
    <TlAudioPlayer
      ref="audioPlayer"
      :audio-list="audioList"
      :before-play="handleBeforePlay"
      :show-play-loading="true"
      @ended="handleEnded"
    >
    </TlAudioPlayer>

    <button @click="handlePlaySpecify">Play the second audio</button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import Vue3AudioPlayer from '../../src/index.vue'
import TlAudioPlayer from '../../src/TlAudioPlayer.vue'

const audioPlayer = ref(null)
const currentAudioName = ref('')

const audioList = [
  {
    src: 'http://music.163.com/song/media/outer/url?id=317151.mp3',
    title: 'Audio Title 1',
    artist: 'Artist Name 1',
    album: 'Album Name 1',
    artwork: [
      {
        src: 'https://upload.jianshu.io/users/upload_avatars/1696356/c358e43854eb?imageMogr2/auto-orient/strip|imageView2/1/w/96/h/96/format/webp',
        sizes: '512x512',
        type: 'image/jpg'
      }
    ]
  },
  {
    src: 'http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3',
    title: 'Audio Title 2'
  }
]

const handleBeforePlay = next => {
  currentAudioName.value = audioList[audioPlayer.value.currentPlayIndex].title
  next()
}

const handlePlaySpecify = () => {
  audioPlayer.value.currentPlayIndex = 1
  nextTick(() => {
    audioPlayer.value.play()
    currentAudioName.value = audioList[audioPlayer.value.currentPlayIndex].title
  })
}

const handleEnded = () => {
  console.log('ended')
}
</script>

<style scoped>
.audio-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.name {
  text-align: center;
  line-height: 80px;
  color: #0c4c7d;
  font-size: 18px;
  font-weight: 600;
}

button {
  margin-top: 15px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background-color: #0c4c7d;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #357abd;
}
</style>
