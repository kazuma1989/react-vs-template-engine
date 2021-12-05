import { StrictMode, Suspense } from "react"
import { createRoot } from "react-dom"
import { SWRConfig } from "swr"
import { App } from "./App"

createRoot(globalThis.document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
        dedupingInterval: 86400_000,
        suspense: true,
        fetcher: (url) =>
          fakeDelay(1_000).then(() => fetch(url).then((r) => r.json())),
      }}
    >
      <Suspense fallback={<progress>Loading...</progress>}>
        <App />
      </Suspense>
    </SWRConfig>
  </StrictMode>
)

function fakeDelay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
