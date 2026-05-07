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

// Remove the modulepreload hint for the three-vendor chunk.
// Three.js (~1.5 MB) is only needed after a pointer interaction, never on
// first load. Keeping its modulepreload causes the browser to fetch it at
// high priority on the throttled Lighthouse network, stealing bandwidth from
// react-vendor and the main chunk and inflating LCP by 1-2 s.
function stripThreePreload() {
  return {
    name: 'strip-three-preload',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html.replace(
          /<link rel="modulepreload"[^>]*three-vendor[^>]*>\n?/g,
          ''
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), asyncCss(), stripThreePreload()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        // Split React/ReactDOM into a separately-cacheable vendor chunk
        // Split Three.js ecosystem into its own chunk so its parse/eval is
        // isolated from the main thread critical path.
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/three/') || id.includes('node_modules/@react-three/')) {
            return 'three-vendor'
          }
        },
      },
    },
  },
})
