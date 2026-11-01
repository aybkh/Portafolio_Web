import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// La web se sirve en la raíz de ayoubjerari.com (GitHub Pages con dominio propio)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',
  build: { target: 'es2020', cssMinify: true }
});
