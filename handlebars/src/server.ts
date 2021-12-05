import Handlebars from "handlebars"
import polka from "polka"

const app = polka().listen(3000, (err: unknown) => {
  if (err) throw err

  console.log(`> Running on localhost:3000`)
})

app.get("/users/:id", (req, res) => {
  const template = Handlebars.compile("{{title}} spends {{calc}}")

  const view = {
    title: req.params.id,
    calc: () => 2 + 4,
  }

  const output = template(view)

  res.end(output)
})
