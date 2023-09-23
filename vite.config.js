import { defineConfig } from 'vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'

const isProd = process.env.NODE_ENV === 'production'
const path = require('path')

export default defineConfig({
  plugins: [
    vue(),
    Components({
      // allow auto load markdown components under `./src/components/`
      extensions: ['vue', 'md'],
      // allow auto import and register components used in markdown
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ]
    }),
  ],
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      '~': path.resolve('src'),
      'assets': path.resolve('src/assets'),
      '@api-mock': isProd ? path.resolve('src/empty') : path.resolve('src/api-mock/')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/element.scss" as *;`,
      },
    },
  }
})
