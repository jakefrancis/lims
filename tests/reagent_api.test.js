const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./testData')
const app = require('../app')
const api = supertest(app)
const Reagent = require('../models/reagent')
const User = require('../models/user')

beforeEach(async () => {
  await Reagent.deleteMany({})
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
})

test('reagents are returned as json', async () => {
  await api
    .get('/api/reagents')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})