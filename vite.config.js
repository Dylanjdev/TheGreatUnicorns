import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Make Vite-injected CSS non-render-blocking so the inline skeleton
// can paint on the very first byte, before the CSS file is fetched.
function asyncCss() {
  return {
    name: 'async-css',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="stylesheet"([^>]*)href="(\/assets\/[^"]+\.css)">/g,
          (_, attrs, href) =>
            `<link rel="preload" as="style"${attrs}href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
            `<noscript><link rel="stylesheet"${attrs}href="${href}"></noscript>`
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), asyncCss()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Split React/ReactDOM into a separately-cacheable vendor chunk
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
        },
      },
    },
  },
})
