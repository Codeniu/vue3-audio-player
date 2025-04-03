<template>
  <div style="text-align: center; color: #4ab7bd">
    <h1>vue3-audio-player</h1>
  </div>

  <div class="audio-container">
    <h3>基础使用</h3>

    <code class="code-block">
      <pre>
        &lt;vue3-audio-player
            ref="audioPlayer"
            :audio-list="audioList"
            :before-play="handleBeforePlay"
            :show-play-loading="true"
            :showVolumeButton="false"
            @ended="handleEnded"
            themeColor="#0c4c7d"
        /&gt;
      </pre>
    </code>

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
    <h3>内置样式</h3>
    <p>设置 mode="tl",以应用第二种样式</p>
    <code class="code-block">
      <pre>
        &lt;vue3-audio-player
          mode="tl"
        /&gt;
      </pre>
    </code>
    <vue3-audio-player
      mode="tl"
      ref="audioPlayer"
      :audio-list="audioList"
      :before-play="handleBeforePlay"
      :show-play-loading="true"
      @ended="handleEnded"
      themeColor="#357abd"
    >
    </vue3-audio-player>

    <button @click="handlePlaySpecify">Play the second audio</button>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import Vue3AudioPlayer from '../../src/index.vue'
// import Vue3AudioPlayer from '../../src/Vue3AudioPlayer.vue'

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

console.log(audioPlayer.value)

const handleBeforePlay = next => {
  console.log('before play', audioPlayer.value)
  currentAudioName.value = audioList[audioPlayer.value.currentPlayIndex].title
  next()
}

const handlePlaySpecify = () => {
  audioPlayer.value.currentPlayIndex = 1
  nextTick(() => {
    console.log(audioPlayer.value)

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

.code-block {
  display: block;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #495057;
  overflow-x: auto;
}

.code-block pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.code-block pre::before {
  content: '';
  display: block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background: #ff5f56;
  box-shadow:
    20px 0 0 #ffbd2e,
    40px 0 0 #27c93f;
  margin-bottom: 16px;
}
</style>
