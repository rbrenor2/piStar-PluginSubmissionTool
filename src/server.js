const express = require('express')
const nunjucks = require('nunjucks')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const flash = require('connect-flash')
const path = require('path')
// const bodyParser = require('body-parser')

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
    // this.express.use(bodyParser.json())
    this.express.use(flash())

    this.express.use(
      session({
        store: new RedisStore({
          host: 'localhost',
          port: 6379,
          ttl: 1800
        }),
        name: 'root',
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
