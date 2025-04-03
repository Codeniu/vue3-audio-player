import { App } from 'vue'
import Vue3AudioPlayer from './index.vue'
import type { AudioPlayerProps, AudioItem } from './types'
export { Vue3AudioPlayer }
export type { AudioPlayerProps, AudioItem }

export default {
  install: (app: App) => {
    app.component('Vue3AudioPlayer', Vue3AudioPlayer)
  }
}
