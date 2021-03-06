const reagentsRouter = require('express').Router()
const Reagent = require('../models/reagent')
const Standard = require('../models/standard')
const userExtractor = require('../utils/middleware').userExtractor



reagentsRouter.get('/', async (request,response) => {
  const reagents = await Reagent
    .find({}).populate( 
    {
      path: 'children',
      name: 1, 
      concentration: 1, 
      location: 1, 
      locationId: 1,
      labId: 1, 
      date: 1, 
      expiration: 1,
      weight: 1,
      finalWeight: 1,
      populate: {path: 'preparer', model: 'User'}
      
      
    })
    response.json(reagents)
})

reagentsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    let newReagent =  {
      name: body.name,
      type: body.type,
      date: body.date,
      concentration: body.concentration,
      expiration: body.expiration,
      labId: body.labId, 
    }
    const reagent = new Reagent(newReagent)
    const savedReagent = await reagent.save()
    response.status(201).json(savedReagent)
})








module.exports = reagentsRouter
