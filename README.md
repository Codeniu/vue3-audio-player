# Vue3 Audio Player API 文档

Vue3 Audio Player 是一个基于 Vue3 的音频播放器组件，提供了丰富的功能和自定义选项。

![](https://codeniu-picbed.oss-cn-hangzhou.aliyuncs.com/picbed/Snipaste_2025-04-03_11-05-22.jpg)

## 安装
使用 npm 安装 Vue3 Audio Player：
```bash
npm install @codeniu/vue3-audio-player
```
## 引入
在你的 Vue 项目中引入 Vue3 Audio Player：
```js
import { Vue3AudioPlayer } from '@codeniu/vue3-audio-player'
import '@codeniu/vue3-audio-player/dist/vue3-audio-player.css'
```
## 使用


在你的组件中使用 Vue3 Audio Player：

```vue
<template>
  <vue3-audio-player
    :audioList="audioList"
    themeColor="#EC4141"
    @play="handlePlay"
    @pause="handlePause"
  />
</template>

<script setup lang="ts">
const audioList = [
  {
    src: 'path/to/audio1.mp3',
    title: '歌曲1',
    artist: '艺术家1',
    album: '专辑1'
  },
  'path/to/audio2.mp3'
]

const handlePlay = () => {
  console.log('开始播放')
}

const handlePause = () => {
  console.log('暂停播放')
}
</script>
```

## 属性 (Props)

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| audioList | `Array<AudioItem \| string>` | `[]` | 音频列表，支持对象数组或字符串数组 |
| showPlayButton | `boolean` | `true` | 是否显示播放/暂停按钮 |
| showPrevButton | `boolean` | `true` | 是否显示上一曲按钮 |
| showNextButton | `boolean` | `true` | 是否显示下一曲按钮 |
| showVolumeButton | `boolean` | `true` | 是否显示音量控制按钮 |
| showProgressBar | `boolean` | `true` | 是否显示进度条 |
| beforePlay | `(callback: (state: boolean) => void) => void` | `undefined` | 播放前的钩子函数 |
| beforePrev | `(callback: (state: boolean) => void) => void` | `undefined` | 切换上一曲前的钩子函数 |
| beforeNext | `(callback: (state: boolean) => void) => void` | `undefined` | 切换下一曲前的钩子函数 |
| isLoop | `boolean` | `true` | 是否循环播放列表 |
| isAutoPlayNext | `boolean` | `true` | 播放结束后是否自动播放下一曲 |
| progressInterval | `number` | `500` | 进度更新间隔时间（毫秒） |
| showPlaybackRate | `boolean` | `true` | 是否显示播放速率控制 |
| showPlayLoading | `boolean` | `true` | 是否显示加载动画 |
| playbackRates | `number[]` | `[0.5, 1, 1.5, 2]` | 可选的播放速率列表 |
| themeColor | `string` | `'#EC4141'` | 主题色 |
| disabledProgressDrag | `boolean` | `false` | 是否禁用进度条拖拽 |
| disabledProgressClick | `boolean` | `false` | 是否禁用进度条点击 |

## 事件 (Events)

| 事件名 | 参数 | 说明 |
|--------|------|------|
| pause | - | 音频暂停时触发 |
| play-prev | - | 切换到上一曲时触发 |
| play-next | - | 切换到下一曲时触发 |
| timeupdate | - | 播放时间更新时触发 |
| durationchange | `event: Event` | 音频时长变化时触发 |
| ended | `event: Event` | 音频播放结束时触发 |
| progress-start | `event: Event` | 开始拖动进度条时触发 |
| progress-end | `event: Event` | 结束拖动进度条时触发 |
| progress-move | `event: Event` | 拖动进度条过程中触发 |
| progress-click | `event: Event` | 点击进度条时触发 |
| playing | - | 音频正在播放时触发 |
| play | - | 音频开始播放时触发 |
| play-error | `error: any` | 播放出错时触发 |

## 插槽 (Slots)

| 插槽名 | 说明 |
|--------|------|
| play-start | 自定义播放按钮 |
| play-pause | 自定义暂停按钮 |
| play-prev | 自定义上一曲按钮 |
| play-next | 自定义下一曲按钮 |


## 方法

| 方法名 | 说明 | 参数 |
|--------|------|------|
| play | 播放音频 | `opts?: { currentTime?: number }` 可选的开始播放时间（秒） |
| pause | 暂停播放 | - |
| playNext | 播放下一曲 | - |
| playPrev | 播放上一曲 | - |
| handleSetPlaybackRate | 设置播放速率 | `rate: number` 播放速率值 |
| handleVolumeIconTouchstart | 显示/隐藏音量控制条 | - |
| handleVolumePanmove | 调节音量大小 | `event: MouseEvent \| TouchEvent` 鼠标或触摸事件 |
| handleClickProgressWrap | 点击进度条跳转播放 | `event: MouseEvent \| TouchEvent` 鼠标或触摸事件 |


## 类型定义

```typescript
interface AudioItem {
  src: string;      // 音频源地址
  title?: string;   // 音频标题
  artist?: string;  // 艺术家
  album?: string;   // 专辑名
  artwork?: {       // 封面图片
    src: string;
    sizes: string;
    type: string;
  }[];
}
```


## 注意事项
1. audioList 支持两种格式：
   - 字符串数组：直接传入音频文件地址
   - 对象数组：包含更多音频信息，支持媒体会话 API
2. 钩子函数 ( beforePlay 、 beforePrev 、 beforeNext ) 可用于拦截相应操作，需要调用回调函数并传入 true 或 false 来决定是否继续操作
3. 主题色 themeColor 会影响播放器的按钮、进度条等元素的颜色
4. 播放速率控制支持自定义速率列表，通过 playbackRates 属性配置
5. 组件支持移动端触摸操作，包括进度条拖拽和音量调节