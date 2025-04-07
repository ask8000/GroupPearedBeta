// models/Event.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  size: Number,
  description: String
});

const eventSchema = new mongoose.Schema({
  eventName: String,
  OrganizationName: String,
  organizerEmail: String,
  eventDate: String,
  eventAdress: String,
  eventDescription: String,
  location: String,
  teams: [teamSchema],
  status: {
    type: String,
    default: 'pending'
  }
});

module.exports = mongoose.model('Event', eventSchema);
