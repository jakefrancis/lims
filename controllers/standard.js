const standardsRouter = require('express').Router()
const Reagent = require('../models/reagent')
const Standard = require('../models/standard')
const userExtractor = require('../utils/middleware').userExtractor



standardsRouter.get('/', async (request,response) => {
  const standards = await Standard
    .find({}).populate('preparer', {name: 1 }).populate('parent',
    {
      name: 1, 
      labId: 1, 
      concentration: 1, 
      date: 1, 
      expiration: 1})
    response.json(standards)
})

standardsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    const parentSolution = await Reagent.findOne({labId: body.parent})
    if(!parentSolution){
      return response.status(401)
    }
    let newStandard =  {
      name: body.name,
      date: body.date,
      location: body.location,
      weight: {
        amount: body.weight.amount,
        unit: body.weight.unit
      },
      finalWeight: {
        amount: body.finalWeight.amount,
        unit: body.finalWeight.unit
      },
      concentration: {
        amount: body.concentration.amount,
        unit: body.concentration.unit
      },
      expiration: body.expiration,
      balance: body.balance,
      externalParentPath: body.externalParentPath,
      parent: parentSolution._id,
      preparer: user._id
    }
    console.log(parentSolution.labId)
    console.log(newStandard)
    
  
    const standard = new Standard(newStandard)
    const savedStandard = await standard.save()
    await parentSolution.updateOne({$push: {children: savedStandard._id}})
    response.status(201).json(savedStandard)
})








module.exports = standardsRouter
