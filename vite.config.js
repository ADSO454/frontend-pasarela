import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 3000,
      open: true,
      host: true,
      proxy: {
        '/api': {
          target: env.VITE_API_TARGET || 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    preview: {
      port: 8080,
    },
    // Definir variables de entorno para el cliente
    define: {
      'import.meta.env.VITE_API_TARGET': JSON.stringify(env.VITE_API_TARGET),
      'import.meta.env.VITE_API_KEY': JSON.stringify(env.VITE_API_KEY),
      'import.meta.env.VITE_API_KEY_ADMIN': JSON.stringify(env.VITE_API_KEY_ADMIN),
      'import.meta.env.VITE_ADMIN_PASSWORD': JSON.stringify(env.VITE_ADMIN_PASSWORD),
    },
  }
})
