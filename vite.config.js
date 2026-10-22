import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';
import { roomCategories, categoryPath, roomPath } from './src/pages/rooms-and-suites/data/roomCatalog.js';

export default defineConfig({
  plugins: [{
    name: 'barli-page-entries',
    enforce: 'post',
    generateBundle(_, bundle) {
      const home = bundle['index.html'];
      if (!home) return;
      const paths = ['/contact/', '/about-us/', ...roomCategories.flatMap(category => [categoryPath(category.slug), ...category.rooms.map(roomPath)])];
      for (const path of paths) this.emitFile({ type: 'asset', fileName: `${path.slice(1)}index.html`, source: home.source });
    },
  }],
  build: {
    rollupOptions: {
      input: {
        notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        rooms: fileURLToPath(new URL('./rooms-and-suites/index.html', import.meta.url)),
        story: fileURLToPath(new URL('./our-story/index.html', import.meta.url)),
      },
    },
  },
});
