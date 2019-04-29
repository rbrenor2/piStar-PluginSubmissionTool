const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.middlewares()
    this.views()
    this.routes()
  }

  middlewares () {
    this.express.use(express.urlencoded({ extended: false }))
    this.express.use(
      session({
        // store: new LokiStore({
        //   path: path.resolve(__dirname, '..', 'temp', 'sessions.db')
        // }),
        store: new RedisStore({
          host: 'localhost',
          port: 6379,
          ttl: 3600
        }),
        secret: 'piStarPluginSecret',
        resave: true,
        saveUninitialized: true
      })
    )
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.set('view engine', 'njk')
  }

  routes () {
    this.express.use(require('./app/routes'))
  }
}

module.exports = new App().express
