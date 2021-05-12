const User = require('../models/user')
const Reagent = require('../models/reagent')
const Standard = require('../models/standard')
const add = require('date-fns/add')

const initialUsers = [
  {
    username: 'donnie',
    name: 'Donnie Turtle',
    password: 'radical'
  }
]

const reagents = [
  {
    name: 'Anions',
    type: 'Solution',
    date: new Date(),
    concentration: {
      amount: 100,
      unit: 'ppm'
    },
    expiration: add(new Date(),{years: 5}),
    labId: 1134 
  },
  {
    name: 'Boric Acid',
    type: 'Reagent',
    date: new Date(),
    expiration: add(new Date(),{years: 5}),
    labId: 1264 
  },
]

const standards = [
  {
    name: 'F Cl SO4',
    date: new Date(),
    location: 'HL',
    weight: {
      amount: 0.99,
      unit: 'g'
    },
    finalWeight: {
      amount: 999.7,
      unit: 'g'
    },
    concentration: {
      amount: 1,
      unit: 'ppb'
    },
    expiration: add(new Date(),{days: 1}),
    balance: 'b13',
    externalParentPath: 'Reagent',
    parent: 1134,
  },
  {
    name: 'Boron',
    date: new Date(),
    location: 'HL',
    weight: {
      amount: 20,
      unit: 'g'
    },
    finalWeight: {
      amount: 1000,
      unit: 'g'
    },
    concentration: {
      amount: 2000,
      unit: 'ppm'
    },
    expiration: add(new Date(),{years: 1}),
    balance: 'b13',
    externalParentPath: 'Reagent',
    parent: 1264,
  }
]


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const reagentsInDb = async () => {
  const reagents = await Reagent.find({})
  return reagents.map(reagent => reagent.toJSON())
}

const standardsInDb = async () => {
  const standards = await Standard.find({})
  return standards.map(standard => standard.toJSON())
}

module.exports = {
  initialUsers,
  reagents,
  standards,
  usersInDb,
  reagentsInDb,
  standardsInDb
}