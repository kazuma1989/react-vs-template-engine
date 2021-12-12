import { useEffect, useState } from "react"

interface Todo {
  completed: boolean
  id: number
  title: string
  userId: number
}

export function App(): JSX.Element {
  const params = new URLSearchParams(globalThis.location.search)

  const currentPage = parseInt(params.get("page") as string) || 1

  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    ;(async () => {
      await fakeDelay(1_000)

      const todos = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${currentPage}`
      ).then((r) => r.json())

      setTodos(todos)
    })()
  }, [])

  return (
    <div>
      <h1>React Example</h1>

      <div style={{ display: "flex", gap: 8 }}>
        {[1, 2, 3, 4, 5].map((page) => {
          const current = page === currentPage

          return (
            <a key={page} href={`?page=${page}`} style={{ padding: 8 }}>
              {current ? (
                <b>
                  <u>{page}</u>
                </b>
              ) : (
                page
              )}
            </a>
          )
        })}
      </div>

      <table style={{ tableLayout: "auto" }}>
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

function fakeDelay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
