import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const url = 'http://192.168.1.83:8080'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: true,
    proxy: {
      '/quizzes': {
        target: url,
        changeOrigin: true,
        secure: false
      },
      '/divisions': {
        target: url,
        changeOrigin: true,
        secure: false
      },
      '/questions': {
        target: url,
        changeOrigin: true,
        secure: false
      },
      '/responses/batch': {
        target: url,
        changeOrigin: true,
        secure: false
      },
      '/responses/result/detailed': {
        target: url,
        changeOrigin: true,
        secure: false
      },
    }
  }
})
