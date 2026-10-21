/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const CATALOG_ORIGIN = 'https://app.econverse.com.br';
const CATALOG_PATH = '/teste-front-end/junior/tecnologia/lista-produtos/produtos.json';

// O endpoint do catálogo não envia cabeçalhos CORS; o proxy permite consumi-lo do navegador.
const catalogProxy = {
  '/api/produtos': {
    target: CATALOG_ORIGIN,
    changeOrigin: true,
    secure: true,
    rewrite: () => CATALOG_PATH,
  },
};

export default defineConfig({
  plugins: [react()],
  server: { proxy: catalogProxy },
  preview: { proxy: catalogProxy },
  css: {
    preprocessorOptions: {
      scss: {
        // Permite `@use 'tokens'` e `@use 'mixins'` em qualquer módulo SCSS.
        loadPaths: [fileURLToPath(new URL('./src/styles', import.meta.url))],
      },
    },
    modules: { localsConvention: 'camelCaseOnly' },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    css: { modules: { classNameStrategy: 'non-scoped' } },
    restoreMocks: true,
  },
});
