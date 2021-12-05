import fs from "fs/promises"
import Handlebars from "handlebars"
import fetch from "node-fetch"
import path from "path"
import polka from "polka"

const port = 5006
const app = polka().listen(port, (err: unknown) => {
  if (err) throw err

  console.log(`> Running on localhost:${port}`)
})

const setup$ = Promise.all([
  fs
    .readFile(path.resolve(__dirname, "./layout.hbs"), "utf-8")
    .then((source) => Handlebars.registerPartial("layout", source)),
])

const template$ = fs
  .readFile(path.resolve(__dirname, "./index.hbs"), "utf-8")
  .then(Handlebars.compile)

app.get("/", async (req, res) => {
  await setup$

  const template = await template$

  await fakeDelay(1_000)

  const currentPage = parseInt(req.query.page as string) || 1
  const todos = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${currentPage}`
  ).then((r) => r.json())

  const output = template({
    pages: [1, 2, 3, 4, 5].map((page) => ({
      page,
      current: page === currentPage,
    })),
    todos,
  })

  res.setHeader("Content-Type", "text/html")
  res.end(output)
})

function fakeDelay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
