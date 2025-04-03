import { onBeforeUnmount, ref } from 'vue'

type VolumeProps = {
  volume: number
}

type EmitType = {
  (e: 'volumeChange', volume: number): void
}

export function useVolume(_props: VolumeProps, emit: EmitType) {
  const volumeWrap = ref<HTMLElement | null>(null)
  const volumeBar = ref<HTMLElement | null>(null)

  const handleVolumeClick = (event: MouseEvent) => {
    if (!volumeWrap.value) return

    const rect = volumeWrap.value.getBoundingClientRect()
    const offsetY = event.clientY - rect.top
    const height = rect.height

    // 计算音量值(0-1之间)
    let volume = 1 - offsetY / height

    // 限制音量范围
    if (volume > 1) volume = 1
    if (volume < 0) volume = 0

    emit('volumeChange', volume)
  }

  const handleVolumeDrag = (event: MouseEvent) => {
    handleVolumeClick(event)
  }

  const handleVolumeDragStart = () => {
    document.addEventListener('mousemove', handleVolumeDrag)
    document.addEventListener('mouseup', handleVolumeDragEnd)
  }

  const handleVolumeDragEnd = () => {
    document.removeEventListener('mousemove', handleVolumeDrag)
    document.removeEventListener('mouseup', handleVolumeDragEnd)
  }

  // 添加拖拽事件监听
  if (volumeBar.value) {
    volumeBar.value.addEventListener('mousedown', handleVolumeDragStart)
  }

  // 移除事件监听
  onBeforeUnmount(() => {
    if (volumeBar.value) {
      volumeBar.value.removeEventListener('mousedown', handleVolumeDragStart)
    }
    document.removeEventListener('mousemove', handleVolumeDrag)
    document.removeEventListener('mouseup', handleVolumeDragEnd)
  })

  return {
    volumeWrap,
    volumeBar,
    handleVolumeClick
  }
}
