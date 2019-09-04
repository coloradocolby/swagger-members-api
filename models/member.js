const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
  },
  birthday: {
    type: Date,
    required: true,
    trim: true,
    lowercase: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  birthLocation: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  currentLocation: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  profession: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now(),
  },
})

const Member = mongoose.model('Member', MemberSchema)

// events
Member.events.on('error', err => console.log(err.message.red))

module.exports = Member
