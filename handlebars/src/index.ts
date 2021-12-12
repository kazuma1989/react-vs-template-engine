import fs from "fs/promises"
import Handlebars from "handlebars"
import path from "path"
import polka from "polka"
import { app } from "./app"

run()

async function run(): Promise<void> {
  await fs
    .readFile(path.resolve(__dirname, "./layout.hbs"), "utf-8")
    .then((source) => Handlebars.registerPartial("layout", source))

  const server = polka()

  server.get("/", async (req, res) => {
    await fakeDelay(1_000)

    res.setHeader("Content-Type", "text/html")
    res.end(await app(req.query))
  })

  const port = 5006
  server.listen(port, (err: unknown) => {
    if (err) throw err

    console.log(`> Running on localhost:${port}`)
  })
}

function fakeDelay(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms)
  })
}
