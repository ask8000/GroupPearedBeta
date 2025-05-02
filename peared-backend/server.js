// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Event = require('./models/Event');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post('/api/events', async (req, res) => {
try {
    console.log("Incoming request body:", req.body); // Log the request body
    const event = new Event({
      ...req.body,
      status: 'pending'
    });
    const savedEvent = await event.save();
    console.log("Event saved:", savedEvent); // Log the saved event
    res.status(201).json({ message: 'Event submitted for approval.' });
  } catch (err) {
    console.error("Error saving event:", err); // Log the error
    res.status(500).json({ error: 'Failed to submit event' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
