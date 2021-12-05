import { useDeferredValue } from "react"
import useSWR from "swr"
import { Link, useLocation } from "wouter"

interface Todo {
  completed: boolean
  id: number
  title: string
  userId: number
}

export function App() {
  const params = useLocationSearch()

  const currentPage = parseInt(params.get("page") as any) || 1
  const deferredPage = useDeferredValue(currentPage)
  const pending = currentPage !== deferredPage

  const todos: Todo[] = useSWR(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${deferredPage}`
  ).data

  return (
    <div>
      <h1>React Example</h1>

      <div>
        {[1, 2, 3, 4, 5].map((page) => {
          const current = page === currentPage

          return (
            <Link key={page} to={`?page=${page}`}>
              <a>
                <button
                  type="button"
                  style={{
                    backgroundColor: current ? "var(--focus)" : undefined,
                  }}
                >
                  {page}
                </button>
              </a>
            </Link>
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

function useLocationSearch(): URLSearchParams {
  useLocation()

  return new URLSearchParams(globalThis.location.search)
}
