import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fs from 'fs'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler']
      }
    }),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@features': path.resolve(__dirname, './src/features'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared')
    }
  },
  server: {
    https: {
      key: fs.readFileSync('./cert/localhost-key.pem'),
      cert: fs.readFileSync('./cert/localhost.pem')
    },
    port: 3000,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'https://localhost:4200',
        changeOrigin: true,
        secure: false
      },
      '/geo': {
        target: 'https://ipinfo.io',
        changeOrigin: true,
        secure: true,
        rewrite: path => path.replace(/^\/geo/, '')
      }
    }
  }
})
