//@ts-nocheck
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* Getting the current directory of the file. */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const externals = ['react', 'react-router-dom', 'react-dom', '@reduxjs/toolkit', 'react-hook-form', 'react-icons', 'redux', 'react-redux'];
// const externals = ['@fastify/autoload', '@fastify/static', 'dotenv', 'fastify', 'mongoose', 'sharp'];
const externals = [];
// const react = ['react','react-dom']

//@ts-ignore
import { clientPackages } from './package.json';

const renderChunks = (deps: Record<string, string>) => {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (externals.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  return {
    plugins: [react()],
    ssr: {
      external: externals
    },
    build: {
      target: 'es2022',
      outDir: resolve(__dirname, 'server/public'),
      emptyOutDir: false,
      minify: true,
      cssCodeSplit: true,
      assetsInlineLimit: 2048,
      rollupOptions: {
        // external: externals,
        output: {
          assetFileNames: '[ext]/[name][extname]',
          entryFileNames: 'js/[name].js',
          chunkFileNames: 'chunks/[name].js',
          manualChunks: !ssrBuild ? {
            react: externals,
            ...renderChunks(clientPackages)
          } : false
        },
      },
    }
  }
})
