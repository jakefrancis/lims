const mongoose = require('mongoose')
const format = require('date-fns/format')

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
    returnedObject.date = format(new Date(returnedObject.date), 'MM/dd/yyyy')
    returnedObject.expiration = format(new Date(returnedObject.expiration), 'MM/dd/yyyy')
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Standard', reagentSchema)