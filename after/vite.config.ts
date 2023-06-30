import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      manifest: {
        name: "Bechdel Films",
        short_name: "Bechdel",
        description: "Simple app to view films that pass the Bechdel test",
        icons: [
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,pdf}"],

        runtimeCaching: [{
          urlPattern:  /^https:\/\/bechdel\.azurewebsites\.net\/api\/.*/i,
          handler: "CacheFirst" as const,
          options: {
            cacheName: "api-cache",
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }]
      },
      //registerType: 'autoUpdate'
    }),
  ],
  build: {
    outDir: './dist/',
    emptyOutDir: true
  },
  server: {
    port: 8888
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
