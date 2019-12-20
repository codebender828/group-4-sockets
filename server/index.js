/* eslint-disable import/order */
const { Nuxt, Builder } = require('nuxt')
const app = require('express')()
const server = require('http').createServer(app)
const consola = require('consola')
const config = require('../nuxt.config.js')
const helmet = require('helmet')
const cors = require('cors')
const logger = require('morgan')

app.use(helmet())
app.use(cors())

// Set Nuxt.js options
/*
 * Import ENV Vars
 */
const NODE_ENV = process.env.NODE_ENV || 'development'
config.dev = !(NODE_ENV === 'production')

switch (NODE_ENV) {
  case 'production':
    console.log = () => { }
    app.use(logger('tiny'))
    break
  case 'staging':
    // console.log = () => { };
    app.use(logger('common'))
    break
  case 'test':
    break
  default:
    app.use(logger('dev'))
    break
}

// Init Nuxt.js
const nuxt = new Nuxt(config)

const { host, port } = nuxt.options.server

// Build only in dev mode
if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
} else {
  nuxt.ready()
}

// Give nuxt middleware to express
app.use(nuxt.render)

// Listen the server
server.listen(port, host)
consola.ready({
  message: `Server listening on http://${host}:${port}`,
  badge: true
})

module.exports = server

require('./sockets')
