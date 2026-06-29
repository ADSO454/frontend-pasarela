import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  server: {
    port: 3000, // Se especifica el puerto para desarrollo
    open: true,
    host: true,
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_TARGET || 'http://localhost:8080',
        changeOrigin: true,
        //secure: false,
      },
    },
  },
  preview: {
    port: 8080, // Se especifica el para producción local
  },
})
