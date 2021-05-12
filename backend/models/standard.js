const mongoose = require('mongoose')
const format = require('date-fns/format')
const uniqueValidator = require('mongoose-unique-validator')
const autoIncrement = require('mongoose-auto-increment')

const standardSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  locationId: Number,
  weight: {
    amount: Number,
    unit: String,
  },
  finalWeight: {
    amount: Number,
    unit: String,
  },
  concentration: {
    amount: Number,
    unit: String
  },
  expiration: Date,
  balance: String,
  preparer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  externalParentPath: {
    type: String,
    required: true,
    enum: ['Standard', 'Reagent']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'externalParentPath',
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Standard'
  }],
  type: {
    type: String,
    default: 'Standard'
  }
})
autoIncrement.initialize(mongoose.connection)
standardSchema.plugin(uniqueValidator)
standardSchema.plugin(autoIncrement.plugin, {model: 'Standard', field: 'locationId'})

standardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.date = format(new Date(returnedObject.date), 'MM/dd/yyyy')
    returnedObject.expiration = format(new Date(returnedObject.expiration), 'MM/dd/yyyy')
    returnedObject.labId = `${returnedObject.location}-${returnedObject.locationId}`
    returnedObject.weight = `${returnedObject.weight.amount} ${returnedObject.weight.unit}`
    returnedObject.finalWeight = `${returnedObject.finalWeight.amount} ${returnedObject.finalWeight.unit}`
    returnedObject.concentration = `${returnedObject.concentration.amount} ${returnedObject.concentration.unit}`
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Standard', standardSchema)