// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/my-app/', // URL base, si tu app se sirve desde una subcarpeta.
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
