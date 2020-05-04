import { merge } from 'lodash'
const env = process.env.NODE_ENV || 'development'

const baseConfig = {
  env,
  isDev: env === 'development',
  isTest: env === 'testing',
  isTest: env === 'production',
  PORT: 1100,
}

let envConfig = {}
switch (env) {
  case 'dev':
    
  case 'development':
    envConfig = require('./dev').config
    break
  case 'test':
  case 'testing':
    envConfig = require('./testing').config
    break
  case 'prod':
    case 'production':
      envConfig = require('./prod').config
      break
  default:
    envConfig = require('./dev').config
}

const config = merge(baseConfig, envConfig)

export default config;
