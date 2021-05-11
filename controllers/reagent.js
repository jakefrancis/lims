const reagentsRouter = require('express').Router()
const Reagent = require('../models/reagent')
const userExtractor = require('../utils/middleware').userExtractor


reagentsRouter.get('/', async (request,response) => {
  const reagents = await Reagent
    .find({})
    response.json(reagents)
})

reagentsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    let newReagent =  {
      name: body.name,
      type: body.type,
      date: body.date,
      concentration: body.concentration || null,
      expiration: body.expiration,
      lot: body.lot, 
    }
    console.log(newReagent)
    const reagent = new Reagent(newReagent)
    const savedReagent = await reagent.save()
    response.status(201).json(savedReagent)
})








module.exports = reagentsRouter
