import fs from "fs/promises"
import Handlebars from "handlebars"
import fetch from "node-fetch"
import path from "path"
import polka from "polka"

const app = polka().listen(3000, (err: unknown) => {
  if (err) throw err

  console.log(`> Running on localhost:3000`)
})

const setup$ = Promise.all([
  fs
    .readFile(path.resolve(__dirname, "./layout.hbs"), "utf-8")
    .then((source) => Handlebars.registerPartial("layout", source)),
])

const template$ = fs
  .readFile(path.resolve(__dirname, "./template.hbs"), "utf-8")
  .then(Handlebars.compile)

app.get("/", async (req, res) => {
  await setup$

  const template = await template$

  const page = 1
  const todos = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${page}`
  ).then((r) => r.json())

  const output = template({ todos })

  res.setHeader("Content-Type", "text/html")
  res.end(output)
})
