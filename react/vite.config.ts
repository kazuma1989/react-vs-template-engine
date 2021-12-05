import react from "@vitejs/plugin-react"
import { UserConfig, UserConfigFn } from "vite"

const config: UserConfigFn = async () => {
  const config: UserConfig = {
    plugins: [
      // The all-in-one Vite plugin for React projects.
      react(),
    ],

    server: {
      port: 5005,
    },

    build: {
      outDir: "./build/",
    },
  }

  return config
}

export default config
