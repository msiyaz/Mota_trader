const mongoose = require('mongoose')
const slugify = require('slugify')
const validator = require('validator')


const contactSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true
  },
  lName: {
    type: String,
  },
  email: {
      type: String,
      validate:[validator.isEmail, 'invalid Email']
  },
  phone: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
  },
})

module.exports = mongoose.model('Contact', contactSchema)