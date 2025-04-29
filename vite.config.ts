import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const url = process.env.VITE_API_BASE_URL || 'http://192.168.0.102:8080'
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
      '/responses/result': {
        target: url,
        changeOrigin: true,
        secure: false
      },
      '/analytics/quizzes': {
        target: url,
        changeOrigin: true,
        secure: false
      },
      '/users': {
        target: url,
        changeOrigin: true,
        secure: false
      },
      '/analytics': {
        target: url,
        changeOrigin: true,
        secure: false
      },
    }
  }
})
