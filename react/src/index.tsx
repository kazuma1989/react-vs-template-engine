import { StrictMode, Suspense, useDeferredValue, useState } from "react"
import { createRoot } from "react-dom"
import useSWR, { SWRConfig } from "swr"

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
          delay(1_000).then(() => fetch(url).then((r) => r.json())),
      }}
    >
      <Suspense fallback={<progress>Loading...</progress>}>
        <App />
      </Suspense>
    </SWRConfig>
  </StrictMode>
)

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}

interface Todo {
  completed: boolean
  id: number
  title: string
  userId: number
}

function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const deferredPage = useDeferredValue(currentPage)
  const pending = currentPage !== deferredPage

  const todos: Todo[] = useSWR(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${deferredPage}`
  ).data

  return (
    <div>
      <h1>React 18 Example</h1>

      <div>
        {[1, 2, 3, 4, 5].map((page) => {
          const current = page === currentPage

          return (
            <button
              key={page}
              type="button"
              onClick={() => {
                setCurrentPage(page)
              }}
              style={{
                background: current ? "var(--focus)" : undefined,
              }}
            >
              {page}
            </button>
          )
        })}
      </div>

      <progress style={{ visibility: pending ? "visible" : "hidden" }}>
        Loading...
      </progress>

      <table
        style={{
          tableLayout: "auto",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>TITLE</th>
            <th>COMPLETED</th>
          </tr>
        </thead>

        <tbody>
          {todos.map(({ id, title, completed }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{title}</td>
              <td>{completed ? "YES" : "NO"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
