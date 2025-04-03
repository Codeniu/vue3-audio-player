import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { AudioPlayerProps, AudioItem } from '../types'

type EmitType = {
  (e: 'timeupdate'): void
  (e: 'play'): void
  (e: 'pause'): void
  (e: 'play-next'): void
  (e: 'play-prev'): void
  (e: 'play-error', error: any): void
  (e: 'ended', event: Event): void
  (e: 'durationchange', event: Event): void
}

export function useAudioPlayer(props: AudioPlayerProps, emit: EmitType) {
  const audio = ref<HTMLAudioElement>()
  const isPlaying = ref(false)
  const isLoading = ref(false)
  const isDragging = ref(false)
  const currentTime = ref('0')
  const duration = ref(0)
  const currentVolume = ref(1)
  const playbackRate = ref(1)
  const currentPlayIndex = ref(0)
  const isShowErrorMessage = ref(false)
  const noticeMessage = ref('')
  const timer = ref<number | null>(null)

  const formatTime = (second: number) => {
    let minute = Math.floor(second / 60)
    let sec = Math.ceil(second % 60)
    if (sec >= 60) {
      minute++
      sec = 0
    }
    return `${String(minute).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
  }

  const currentTimeFormatted = computed(() => {
    return currentTime.value ? formatTime(Number(currentTime.value)) : '00:00'
  })

  const durationFormatted = computed(() => {
    return duration.value ? formatTime(duration.value) : '00:00'
  })

  const handleShowErrorMessage = (opts: { message: string; duration?: number }) => {
    noticeMessage.value = opts.message
    isShowErrorMessage.value = true
    setTimeout(() => {
      isShowErrorMessage.value = false
    }, opts.duration || 3000)
  }

  const clearTimer = () => {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  const playing = () => {
    if (!audio.value || isDragging.value) return
    currentTime.value = String(audio.value.currentTime)
    emit('timeupdate')
  }

  const play = async (opts: { currentTime?: number } = {}) => {
    return new Promise(async (resolve, reject) => {
      isLoading.value = true

      const handlePlay = async () => {
        updateMediaMetadata()

        try {
          await audio.value?.play()
          await nextTick()

          if (opts?.currentTime) {
            audio.value!.currentTime = opts.currentTime
          }

          if (timer.value) {
            currentTime.value = String(audio.value?.currentTime)
          } else {
            timer.value = window.setInterval(playing, props.progressInterval)
          }

          isPlaying.value = true
          isLoading.value = false
          if (audio.value) {
            audio.value.playbackRate = playbackRate.value
          }

          emit('play')
          resolve(audio.value)
        } catch (error: any) {
          handleShowErrorMessage({
            message: error.message
          })

          if (error.code === 9 && props.isAutoPlayNext) {
            setTimeout(() => {
              playNext()
            }, 3000)
          }

          isLoading.value = false
          emit('play-error', error)
          reject(error)
        }
      }

      if (props.beforePlay) {
        props.beforePlay((state: boolean) => {
          if (state !== false) {
            handlePlay()
          }
        })
        return
      }

      handlePlay()
    })
  }

  const pause = () => {
    audio.value?.pause()
    isPlaying.value = false
    emit('pause')
  }

  const playNext = async () => {
    if (props.beforeNext) {
      const canNext = await props.beforeNext()
      if (!canNext) return
    }

    if (currentPlayIndex.value >= props.audioList.length - 1) {
      if (props.isLoop) {
        currentPlayIndex.value = 0
      } else {
        return
      }
    } else {
      currentPlayIndex.value++
    }

    emit('play-next')
    await nextTick()
    await play()
  }

  const playPrev = async () => {
    if (props.beforePrev) {
      const canPrev = await props.beforePrev()
      if (!canPrev) return
    }

    if (currentPlayIndex.value <= 0) {
      if (props.isLoop) {
        currentPlayIndex.value = props.audioList.length - 1
      } else {
        return
      }
    } else {
      currentPlayIndex.value--
    }

    emit('play-prev')
    await nextTick()
    await play()
  }

  const handleSetPlaybackRate = (rate: number) => {
    if (!audio.value) return
    playbackRate.value = rate
    audio.value.playbackRate = rate
  }

  const handleVolumeChange = (volume: number) => {
    if (!audio.value) return
    currentVolume.value = volume
    audio.value.volume = volume
  }

  const handleTimeUpdate = (time: number) => {
    if (!audio.value) return
    currentTime.value = String(time)
    audio.value.currentTime = time
  }

  const onEnded = (event: Event) => {
    emit('ended', event)
    if (props.isAutoPlayNext) {
      playNext()
    }
  }

  const onDurationchange = (event: Event) => {
    if (!audio.value) return
    duration.value = audio.value.duration
    emit('durationchange', event)
  }

  const updateMediaMetadata = () => {
    if ('mediaSession' in navigator) {
      const currentAudio = props.audioList[currentPlayIndex.value] as AudioItem
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentAudio.title,
        artist: currentAudio.artist,
        album: currentAudio.album,
        artwork: currentAudio.artwork
      })

      navigator.mediaSession.setActionHandler('play', () => play())
      navigator.mediaSession.setActionHandler('pause', () => pause())
      navigator.mediaSession.setActionHandler('previoustrack', () => playPrev())
      navigator.mediaSession.setActionHandler('nexttrack', () => playNext())
    }
  }

  onMounted(() => {
    if (audio.value) {
      audio.value.volume = currentVolume.value
      audio.value.playbackRate = playbackRate.value
    }
  })

  onBeforeUnmount(() => {
    clearTimer()
  })

  return {
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
    handleProgressStart: () => (isDragging.value = true),
    handleProgressEnd: () => (isDragging.value = false),
    handleProgressMove: playing,
    handleProgressClick: playing,
    onEnded,
    onDurationchange
  }
}
