const mongoose = require('mongoose')

const standardSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
  locationId: String,
  weight: Number,
  finalWeight: Number,
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
  externalParentPath: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'externalParentPath',
    required: true
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Standard'
  }]
})

standardSchema.plugin(uniqueValidator)

standardSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.date = format(new Date(returnedObject.date), 'MM/dd/yyyy')
    returnedObject.expiration = format(new Date(returnedObject.expiration), 'MM/dd/yyyy')
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Standard', standardSchema)