import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/** @type {import('vite').UserConfig} */
export default defineConfig({
    esbuild: { jsx: 'automatic' },
    plugins: [react()]
})
