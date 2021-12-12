import fs from "fs/promises"
import Handlebars from "handlebars"
import fetch from "node-fetch"
import path from "path"
import { Polka } from "polka"

type Query = Parameters<Parameters<Polka["get"]>[1]>[0]["query"]

export async function app(query: Query): Promise<string> {
  const template = await fs
    .readFile(path.resolve(__dirname, "./index.hbs"), "utf-8")
    .then(Handlebars.compile)

  const currentPage = parseInt(query.page as string) || 1
  const todos = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${currentPage}`
  ).then((r) => r.json())

  return template({
    pages: [1, 2, 3, 4, 5].map((page) => ({
      page,
      current: page === currentPage,
    })),
    todos,
  })
}
