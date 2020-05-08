require('dotenv').config()

const express = require('express')
const colors = require('colors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const swaggerUI = require('swagger-ui-express')

const db = require('./db/db')
const PORT = process.env.PORT || 8000

let swaggerDoc = require('./swagger.json')

if (process.env.NODE_ENV !== 'production') {
  swaggerDoc.host = `localhost:${PORT}`
}

const app = express()
;(async () => {
  await db.connect(process.env.MONGO_URI)

  app.use(bodyParser.json())
  app.use(morgan('dev'))

  app.get('/', (req, res) => {
    res.redirect('/swagger')
  })

  app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

  app.use('/api/members', require('./routes/member'))

  /**
   * catch any outstanding errors and display a helpful
   * error message to the user
   */
  app.use((error, req, res, next) => {
    res.status(error.status || 500)
    const { message } = error
    res.json({
      error: {
        message,
      },
    })
  })

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}\n`.magenta.bold)
    app.emit('READY')
  })
})()

module.exports = app
