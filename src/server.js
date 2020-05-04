import express from 'express'
import { json, urlencoded } from 'body-parser'
import config from './config'
import { connect } from "./utils/db"

export const app = express()

app.disable('x-powered-by')

app.use(json())

app.use(urlencoded({ extended: true }))


export const start = async () => {

  try {
    await connect()
    app.listen(config.PORT, () => {
      console.log(`Server running on http://localhost:${config.PORT}`)
    })
  } catch (e) {
    console.error(e)
  }
}
