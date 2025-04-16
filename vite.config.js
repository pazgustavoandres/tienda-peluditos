// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './', // Cambiado para servir relativamente al directorio actual
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
