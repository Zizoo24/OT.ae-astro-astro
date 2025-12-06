import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://onlinetranslation.ae',
  output: 'static',
  server: {
    port: 5000,
    host: '0.0.0.0'
  },
  build: {
    assets: 'assets'
  },
  vite: {
    server: {
      host: '0.0.0.0',
      allowedHosts: ['.replit.dev', '.repl.co', 'localhost'],
      hmr: false
    }
  }
});
