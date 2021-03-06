const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

// console.log('connectiong to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection MongoDB:', error.message)
  })


const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minlength: 5,
    require: true
  },
  date: {
    type: Date,
    require: true
  },
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports =  mongoose.model('Note', noteSchema)

