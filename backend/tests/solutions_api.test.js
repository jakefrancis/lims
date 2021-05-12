const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./testData')
const app = require('../app')
const api = supertest(app)
const Reagent = require('../models/reagent')
const Standard = require('../models/standard')
const User = require('../models/user')
const add = require('date-fns/add')

beforeEach(async () => {
  await Standard.resetCount((error, nextCount) => {
    nextCount = 1
  })
  await Reagent.deleteMany({})
  await Standard.deleteMany({})
  await User.deleteMany({})
  for(const user of helper.initialUsers){
    await api.post('/api/users')
      .send(user)
  }
  const login = await api.post('/api/login')
    .send(helper.initialUsers[0])
 
  for(let reagent of helper.reagents){
    await api
      .post('/api/reagents')
      .set('Authorization', 'bearer ' + login.body.token)
      .send(reagent)
  }

  for(let standard of helper.standards){
    await api
      .post('/api/standards')
      .set('Authorization', 'bearer ' + login.body.token)
      .send(standard)
  }
})

test('solutions are returned as json', async () => {
  await api
    .get('/api/standards')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('valid solutions are created', async () => {
  const newStandard = {
    name: 'F Cl SO4',
    date: new Date(),
    location: 'HL',
    weight: {
      amount: 4.99,
      unit: 'g'
    },
    finalWeight: {
      amount: 999.7,
      unit: 'g'
    },
    concentration: {
      amount: 5,
      unit: 'ppb'
    },
    expiration: add(new Date(),{days: 1}),
    balance: 'b13',
    externalParentPath: 'Reagent',
    parent: 1134,
  }
  const login = await api.post('/api/login')
    .send(helper.initialUsers[0])

  await api.post('/api/standards')
  .set('Authorization', 'bearer ' + login.body.token)
  .send(newStandard)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  const standardsAtEnd = await helper.standardsInDb()
  expect(standardsAtEnd).toHaveLength(helper.standards.length + 1)
  const reagentsAtEnd = await helper.reagentsInDb()
  expect(reagentsAtEnd[0].children).toHaveLength(2)
})

test('solution with invalid parent id are not created', async () => {
  const newStandard = {
    name: 'F Cl SO4',
    date: new Date(),
    location: 'HL',
    weight: {
      amount: 4.99,
      unit: 'g'
    },
    finalWeight: {
      amount: 999.7,
      unit: 'g'
    },
    concentration: {
      amount: 5,
      unit: 'ppb'
    },
    expiration: add(new Date(),{days: 1}),
    balance: 'b13',
    externalParentPath: 'Reagent',
    parent: 1111,
  }
  const login = await api.post('/api/login')
    .send(helper.initialUsers[0])

  await api.post('/api/standards')
  .set('Authorization', 'bearer ' + login.body.token)
  .send(newStandard)
  .expect(401)
  .expect('Content-Type', /application\/json/)
  const standardsAtEnd = await helper.standardsInDb()
  expect(standardsAtEnd).toHaveLength(helper.standards.length)
})

test('standards can have parent that is a standard when created', async () => {
  const newStandard = {
    name: 'F Cl SO4',
    date: new Date(),
    location: 'HL',
    weight: {
      amount: 10,
      unit: 'g'
    },
    finalWeight: {
      amount: 1000,
      unit: 'g'
    },
    concentration: {
      amount: 1,
      unit: 'ppm'
    },
    expiration: add(new Date(),{months: 1}),
    balance: 'b13',
    externalParentPath: 'Reagent',
    parent: 1134,
  }

  const newChildFromStandard = 
  {
    name: 'F Cl SO4',
    date: new Date(),
    location: 'HL',
    weight: {
      amount: 10,
      unit: 'g'
    },
    finalWeight: {
      amount: 1000,
      unit: 'g'
    },
    concentration: {
      amount: 1,
      unit: 'ppm'
    },
    expiration: add(new Date(),{days: 1}),
    balance: 'b13',
    externalParentPath: 'Standard',
    parent: 2,
  }
  const login = await api.post('/api/login')
    .send(helper.initialUsers[0])

  await api.post('/api/standards')
  .set('Authorization', 'bearer ' + login.body.token)
  .send(newStandard)
  .expect(201)
  .expect('Content-Type', /application\/json/)

  await api.post('/api/standards')
  .set('Authorization', 'bearer ' + login.body.token)
  .send(newChildFromStandard)
  .expect(201)
  .expect('Content-Type', /application\/json/)


  const standardsAtEnd = await helper.standardsInDb()
  expect(standardsAtEnd).toHaveLength(helper.standards.length + 2)
  expect(standardsAtEnd[2].children).toHaveLength(1)
})


afterAll(() => {
  mongoose.connection.close()
})