const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./testData')
const app = require('../app')
const api = supertest(app)
const Reagent = require('../models/reagent')
const Standard = require('../models/standard')
const User = require('../models/user')

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

afterAll(() => {
  mongoose.connection.close()
})