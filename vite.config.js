import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        rooms: fileURLToPath(new URL('./rooms-and-suites/index.html', import.meta.url)),
        story: fileURLToPath(new URL('./our-story/index.html', import.meta.url)),
      },
    },
  },
});
