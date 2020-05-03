import express from 'express'
import { json, urlencoded } from 'body-parser'

export const app = express()

app.disable('x-powered-by')

app.use(json())
app.use(urlencoded({ extended: true }))


export const start = async () => {
    const PORT = process.env.PORT || 5000;

  try {
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
