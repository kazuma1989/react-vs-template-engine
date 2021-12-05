import fs from "fs/promises"
import Handlebars from "handlebars"
import path from "path"
import polka from "polka"

const app = polka().listen(3000, (err: unknown) => {
  if (err) throw err

  console.log(`> Running on localhost:3000`)
})

const template$ = fs
  .readFile(path.resolve(__dirname, "./template.hbs"), "utf-8")
  .then(Handlebars.compile)

app.get("/users/:id", async (req, res) => {
  const view = {
    title: req.params.id,
    calc: () => 2 + 4,
  }

  const template = await template$
  const output = template(view)

  res.setHeader("Content-Type", "text/html")
  res.end(output)
})
