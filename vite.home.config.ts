import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist-home',
    emptyOutDir: true,
    rollupOptions: {
      input: 'home.html',
    },
  },
})