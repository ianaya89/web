const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 4567

app.set('port', port)

// Import and Set Nuxt.js options
const config = require('../../nuxt.config.js')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (nuxt.options.dev) {
    await new Builder(nuxt).build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  const server = app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })

  // Run cypress
  const opts = ['run'].concat(process.argv.slice(2))

  const spawn = require('cross-spawn')
  const runner = spawn('./node_modules/.bin/cypress', opts, {
    stdio: 'inherit',
    // enable this for DEBUG logging
    env: {
      DEBUG: 'cypress:*'
    }
  })

  // Handle server exit and error states
  runner.on('exit', code => {
    server.close()
    process.exit(code)
  })

  runner.on('error', err => {
    server.close()
    throw err
  })
}
start()
