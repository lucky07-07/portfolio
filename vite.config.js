import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honor a harness-assigned PORT (e.g. the preview tool) when present;
  // otherwise fall back to Vite's normal default for `npm run dev`.
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : undefined,
  },
})
