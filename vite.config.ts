import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// 是否构建文档
const isDocsMode = process.env.BUILD_MODE === 'dev'

export default defineConfig({
  plugins: [vue()],
  root: isDocsMode ? 'examples' : '.',
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
    host: true
  },
  build: isDocsMode
    ? {
        outDir: 'vue3-audio-player',
        assetsDir: 'vue3-audio-player',
        emptyOutDir: true
      }
    : {
        lib: {
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'Vue3AudioPlayer',
          fileName: format => `vue3-audio-player.${format}.js`,
          formats: ['es', 'umd']
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            },
            exports: 'named',
            sourcemap: false,
            assetFileNames: assetInfo => {
              if (assetInfo.name === 'style.css') {
                return 'vue3-audio-player.css'
              }
              return assetInfo.name
            }
          }
        },
        minify: 'esbuild',
        emptyOutDir: true,
        reportCompressedSize: true
      }
})
