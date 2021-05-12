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
      expiration: 1,
      weight: 1,
      finalWeight: 1,
      location: 1,
      locationId: 1,
      parent: 1,
    })
    response.json(standards)
})

standardsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user
    const parentRef = body.externalParentPath

    const parentSolution = parentRef === 'Reagent' ?
    await Reagent.findOne({labId: body.parent}) :
    await Standard.findOne({locationId: body.parent})

    if(parentSolution === null){
        return response.status(401).json({error: `parentId: ${body.parent} does not exist`})
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
  
    const standard = new Standard(newStandard)
    const savedStandard = await standard.save()
    await parentSolution.updateOne({$push: {children: savedStandard._id}})
    await parentSolution.save()
    response.status(201).json(savedStandard)
})








module.exports = standardsRouter
