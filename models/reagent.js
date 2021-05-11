const mongoose = require('mongoose')

const reagentSchema = new mongoose.Schema({
  name: String,
  type: String,
  date: Date,
  concentration: {
    amount: Number,
    unit: String
  },
  expiration: Date,
  lot: String, 
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Standard'
  }]
})


reagentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Standard', reagentSchema)