import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    // The all-in-one Vite plugin for React projects.
    react(),
  ],

  server: {
    port: 5005,
  },
})
