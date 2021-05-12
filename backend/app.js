const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const reagentsRouter = require('./controllers/reagent')
const standardRouter = require('./controllers/standard')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

if(process.env.NODE_ENV === 'test'){
  console.log('test')
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

autoIncrement.initialize(mongoose.connection)

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/reagents', reagentsRouter)
app.use('/api/standards', standardRouter)



app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app