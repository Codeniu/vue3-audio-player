import { ref, onBeforeUnmount, watch } from 'vue'

type ProgressProps = {
  currentTime: string
  duration: number
  disabledDrag: boolean
  disabledClick: boolean
}

type EmitType = {
  (e: 'timeUpdate', time: number): void
  (e: 'progressStart', event: Event): void
  (e: 'progressEnd', event: Event): void
  (e: 'progressMove', event: Event): void
  (e: 'progressClick', event: Event): void
}

export function useProgress(props: ProgressProps, emit: EmitType) {
  const progressWrap = ref<HTMLElement | null>(null)
  const progress = ref<HTMLElement | null>(null)
  const progressPoint = ref<HTMLElement | null>(null)

  // 计算进度条宽度
  const updateProgress = () => {
    if (!progress.value || !progressPoint.value || !props.duration) return
    const percent = (Number(props.currentTime) / props.duration) * 100
    progress.value.style.width = `${percent}%`
    progressPoint.value.style.left = `${percent}%`
  }

  // 根据点击位置更新时间
  const handleProgressClick = (event: MouseEvent) => {
    if (props.disabledClick || !progressWrap.value || !props.duration) return

    const rect = progressWrap.value.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const time = (offsetX / rect.width) * props.duration

    emit('timeUpdate', time)
    emit('progressClick', event)
  }

  // 处理拖拽开始
  const handleProgressStart = (event: MouseEvent | TouchEvent) => {
    if (props.disabledDrag) return

    emit('progressStart', event)

    if (event instanceof MouseEvent) {
      document.addEventListener('mousemove', handleProgressMove)
      document.addEventListener('mouseup', handleProgressEnd)
    } else {
      document.addEventListener('touchmove', handleProgressMove)
      document.addEventListener('touchend', handleProgressEnd)
    }
  }

  // 处理拖拽移动
  const handleProgressMove = (event: MouseEvent | TouchEvent) => {
    if (!progressWrap.value || !props.duration) return

    const rect = progressWrap.value.getBoundingClientRect()
    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX
    const offsetX = clientX - rect.left
    let time = (offsetX / rect.width) * props.duration

    // 限制范围
    if (time < 0) time = 0
    if (time > props.duration) time = props.duration

    emit('timeUpdate', time)
    emit('progressMove', event)
  }

  // 处理拖拽结束
  const handleProgressEnd = (event: MouseEvent | TouchEvent) => {
    emit('progressEnd', event)

    document.removeEventListener('mousemove', handleProgressMove)
    document.removeEventListener('mouseup', handleProgressEnd)
    document.removeEventListener('touchmove', handleProgressMove)
    document.removeEventListener('touchend', handleProgressEnd)
  }

  // 监听当前时间变化更新进度条
  watch(() => props.currentTime, updateProgress)

  // 组件卸载时清理事件监听
  onBeforeUnmount(() => {
    document.removeEventListener('mousemove', handleProgressMove)
    document.removeEventListener('mouseup', handleProgressEnd)
    document.removeEventListener('touchmove', handleProgressMove)
    document.removeEventListener('touchend', handleProgressEnd)
  })

  return {
    progressWrap,
    progress,
    progressPoint,
    handleProgressClick,
    handleProgressStart
  }
}
