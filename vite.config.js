const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        stncryp: resolve(__dirname, 'stncryp/index.html'),
        xtnc: resolve(__dirname, 'xtnc/index.html')
      }
    }
  }
})
