const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


usersRouter.get('/', async (request,response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request,response) => {
  const body = request.body
  const minimumLength = 3
  if(body.password.length < minimumLength){
    return response.status(400).json( { error: `password must be at least ${minimumLength} characters` })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User ({
    username: body.username,
    name: body.name,
    passwordHash
  })
  await user.save()
  response.json(user)
})

module.exports = usersRouter