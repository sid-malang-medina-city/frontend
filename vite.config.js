import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isProd = process.env.NODE_ENV === 'production'
const path = require('path')

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8000
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
      'assets': path.resolve('src/assets'),
      '@api-mock': isProd ? path.resolve('src/empty') : path.resolve('src/api-mock/')
    }
  }
})
