const { resolve } = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import commonjs from '@rollup/plugin-commonjs'
// import commonjs from 'rollup-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    commonjs(
      {
        dynamicRequireTargets: [
          // include using a glob pattern (either a string or an array of strings)
          'node_modules/countdown/*.js',
      
          // exclude files that are known to not be required dynamically, this allows for better optimizations
          // '!node_modules/logform/index.js',
          // '!node_modules/logform/format.js',
          // '!node_modules/logform/levels.js',
          // '!node_modules/logform/browser.js'
        ]
      }
    )
  ],
  build: {
    rollupOptions: {
      input: {
        // index: resolve(__dirname, 'index.html'),
        // stncryp: resolve(__dirname, 'stncryp/index.html'),
        xtnc: resolve(__dirname, 'xtnc/index.html')
      }
    }
  }
})
