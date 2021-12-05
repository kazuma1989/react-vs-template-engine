import Mustache from "mustache"
import polka from "polka"

const app = polka().listen(3000, (err: unknown) => {
  if (err) throw err

  console.log(`> Running on localhost:3000`)
})

app.get("/users/:id", (req, res) => {
  const view = {
    title: req.params.id,
    calc: () => 2 + 4,
  }

  const output = Mustache.render("{{title}} spends {{calc}}", view)

  res.end(output)
})
