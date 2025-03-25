import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  base: '',
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    viteTsconfigPaths(),
    svgr(),
  ],
  server: {
    open: true,
    port: 3000,
    proxy: {
      // Proxy requests to .netlify/functions to the server running on port 8888
      '/.netlify/functions': {
        target: 'http://localhost:8888', // Target for Netlify functions
        changeOrigin: true, // Ensures the request looks like it's from the same origin
      },
    },
  },
})
