import { StrictMode } from "react"
import { createRoot } from "react-dom"
import { App } from "./App"

createRoot(globalThis.document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
