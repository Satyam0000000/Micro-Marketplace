import { defineConfig } from 'vite'
import path from "path"
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
})
