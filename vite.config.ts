import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/quizzes': {
        target: 'http://192.168.1.226:8080',
        changeOrigin: true,
        secure: false
      },
      '/divisions': {
        target: 'http://192.168.1.226:8080',
        changeOrigin: true,
        secure: false
      }, 
      '/questions': {
        target: 'http://192.168.1.226:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
