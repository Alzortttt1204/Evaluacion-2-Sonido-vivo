import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Nos permite usar describe, it y expect sin importarlos en cada archivo
    environment: 'jsdom', // Navegador simulado para renderizar los componentes en las pruebas
    setupFiles: './src/setupTests.js', // Archivo de configuración inicial de las pruebas
  }
})
