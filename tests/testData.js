const User = require('../models/user')
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
    lot: '#123456', 
  },
  {
    name: 'Anions',
    type: 'Reagent',
    date: new Date(),
    expiration: add(new Date(),{years: 5}),
    lot: '#123456', 
  },
]


const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUsers,
  reagents,
  usersInDb
}