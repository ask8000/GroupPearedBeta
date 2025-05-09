// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const Event = require('./models/Event');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'mysecretkey',       // Used to sign the session ID cookie CHANGE TS IN PRODUCTION
  resave: false,               // Don't save session if nothing changed
  saveUninitialized: false,    // Don't save empty sessions
  cookie: {
    secure: false, // Set to true only if using HTTPS
    httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
    sameSite: 'lax', // Adjust this if needed for cross-origin requests
  },    
}));
app.use(cors({
  origin: 'http://127.0.0.1:5500', // live server link so...
  credentials: true 
}));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.post('/api/events', async (req, res) => {
try {
    console.log("Incoming request body:", req.body); // Log the request body
    const event = new Event({
      ...req.body, // What the hell are the dots doing here? - Nathan
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
app.get('/api/grabit', async (req, res) => {
  try {
    const { status, page = 1 } = req.query; // Extract status and page from query parameters
    const query = status !== 'all' ? { status } : {}; // Filter by status if provided
    const limit = 3; // Number of events per page
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const docs = await Event.find(query).sort({eventDate: 1}).skip(skip).limit(limit); // Fetch events with pagination and sort by eventDate in ascending order
    res.status(200).json({ events: docs });
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

const validCredentials = [
  { username: 'admin', password: 'admin123' },
  { username: 'manager', password: 'manager456' }
];
app.get('/api/login', async (req, res) => {
  try {
    const {username, password} = req.query; 
    // Validate credentials
    let isValid = false;
    for (let i = 0; i < validCredentials.length; i++) {
      if (validCredentials[i].username === username && validCredentials[i].password === password) {
        isValid = true;
        break;
      }
    }
    if (isValid) {
      req.session.user = username;
      console.log("Session created: ", req.session); // Log successful login
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ error: 'Login failed' });
  }
})

app.get('/api/checkLogin', (req, res) => {
  console.log("Here is the session data: ", req.session); 
  if (req.session.user) {
    res.status(200).json({ loggedIn: true, username: req.session.user });
  } else {
    res.status(200).json({ loggedIn: false });
  }
}) // TODO: make this work its not saving session data

app.listen(3000, () => console.log('Server running on port 3000'));
