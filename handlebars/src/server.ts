import fs from "fs/promises"
import Handlebars from "handlebars"
import path from "path"
import polka from "polka"

const app = polka().listen(3000, (err: unknown) => {
  if (err) throw err

  console.log(`> Running on localhost:3000`)
})

app.get("/users/:id", async (req, res) => {
  const source = await fs
    .readFile(path.resolve(__dirname, "./template.hbs"))
    .then((buffer) => buffer.toString())

  const template = Handlebars.compile(source)

  const view = {
    title: req.params.id,
    calc: () => 2 + 4,
  }

  const output = template(view)

  res.setHeader("Content-Type", "text/html")
  res.end(output)
})
