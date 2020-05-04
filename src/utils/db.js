import mongoose from 'mongoose'
import config from '../config'


export const connect = (url = config.dbUrl, opts = {}) => {
  console.log(url, config)

  return mongoose.connect(
    url,
    { ...opts, useNewUrlParser: true }
  )
}
