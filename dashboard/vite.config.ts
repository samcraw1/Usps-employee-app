import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards /api/* to the Spring Boot backend. The browser only ever
      // talks to :5173, so this sidesteps CORS entirely in development —
      // fetch("/api/employees/1") here reaches localhost:8080/api/employees/1.
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})
